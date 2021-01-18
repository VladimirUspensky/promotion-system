import random
import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from typing import List

INSTAGRAM_AUTH_PAGE = 'https://instagram.com'


class InstagramPromotionBot:
    """

    """

    def __init__(self, username, password):
        self._username = username
        self._password = password
        self._driver = webdriver.Chrome('chromedriver/chromedriver')

    def login(self) -> None:
        """
        Logs into the account
        :return:
        """
        self._driver.get(INSTAGRAM_AUTH_PAGE)
        time.sleep(5)

        username_field = self._driver.find_element_by_name('username')
        username_field.clear()
        username_field.send_keys(self._username)

        password_field = self._driver.find_element_by_name('password')
        password_field.clear()
        password_field.send_keys(self._password)

        password_field.send_keys(Keys.ENTER)

        time.sleep(5)

    def _close_driver(self) -> None:
        """
        Closes the browser
        :return:
        """
        self._driver.close()
        self._driver.quit()

    def get_posts_by_hashtag(self, hashtag: str, posts_num: int) -> List['str']:
        """
        Gets posts by given hashtag and number of posts
        :param hashtag:
        :param posts_num:
        :return:
        """
        self.login()
        self._driver.get(f'https://www.instagram.com/explore/tags/{hashtag}/')

        posts_refs = []
        while len(posts_refs) < posts_num:
            self._driver.execute_script('window.scrollTo(0, document.body.scrollHeight);')
            time.sleep(random.randrange(3, 5))
            a_tags = self._driver.find_elements_by_tag_name('a')
            [posts_refs.append(ref.get_attribute('href')) for ref in a_tags if '/p/' in ref.get_attribute('href')
             and ref.get_attribute('href') not in posts_refs]

        # self._close_driver()
        return posts_refs

    def like_posts(self, posts_refs: List[str]) -> None:
        """
        The method likes given posts
        :param posts_refs:
        :return:
        """
        for post in posts_refs[0:1]:
            self._driver.get(post)
            self._driver.find_element_by_xpath(
                '/html/body/div[1]/section/main/div/div[1]/article/div[3]/section[1]/span[1]/button').click()
            time.sleep(10)
        self._close_driver()

    def unlike_posts(self, posts_refs: List[str]) -> None:
        """
        Unlikes given posts
        :param posts_refs:
        :return:
        """

    def send_message_to_direct(self, messages: List[str], accounts_refs: List[str]) -> None:
        """

        :param messages:
        :param accounts_refs:
        :return:
        """

    def subscribe(self, account_refs: List[str]) -> None:
        """

        :param account_refs:
        :return:
        """

    def unsubscribe(self, accounts_refs: List[str]) -> None:
        """

        :param accounts_refs:
        :return:
        """

    def write_comment(self, comment: str) -> None:
        """

        :param comment:
        :return:
        """

    def watch_stories(self, accounts_refs: List[str]) -> None:
        """

        :param accounts_refs:
        :return:
        """



