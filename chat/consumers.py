from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json

from django.contrib.auth import get_user_model
from django.db.models import Q

from .models import Message, Chat

User = get_user_model()


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        self.accept()
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

    def disconnect(self, code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        from_user = text_data_json['from_user']
        to_user = text_data_json['to_user']
        room_name = text_data_json['room_name']

        if text_data_json['type'] == 'send_new_message':
            message, room_name = self.create_message(text_data_json)
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'send_new_message',
                    'content': message.content,
                    'from_user': from_user,
                    'to_user': to_user,
                    'room_name': room_name
                }
            )
        elif text_data_json['type'] == 'send_chat_history':
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'send_chat_history',
                    'from_user': from_user,
                    'to_user': to_user,
                    'room_name': room_name
                }
            )

    def send_new_message(self, event):
        content = event['content']
        from_user = event['from_user']
        to_user = event['to_user']
        room_name = event['room_name']
        self.send(text_data=json.dumps({
            'content': content,
            'from_user': from_user,
            'to_user': to_user,
            'room_name': room_name
        }))

    def messages_to_json(self, messages):
        json_messages = []
        for message in messages:
            json_messages.append(self.message_to_json(message))
        return json_messages

    def message_to_json(self, message):
        return {
            'from_user': json.dumps(str(message.from_user)),
            'to_user': json.dumps(str(message.to_user)),
            'content': message.content,
            'send_date': str(message.send_date)
        }

    def send_chat_history(self, data):
        chat = Chat.objects.filter(name=data['room_name']).first()
        messages = chat.messages.all()
        messages = self.messages_to_json(messages)
        self.send(text_data=json.dumps(messages))

    def create_message(self, text_data_json):
        content = text_data_json.get('content')
        from_user = text_data_json['from_user']
        to_user = text_data_json['to_user']
        room_name = text_data_json['room_name']
        message = Message.objects.create(
            from_user_id=from_user['id'],
            to_user_id=to_user['id'],
            content=content
        )
        message.save()
        return message, room_name

