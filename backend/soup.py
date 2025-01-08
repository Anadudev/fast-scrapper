from bs4 import BeautifulSoup
import requests

url = 'http://books.toscrape.com/'
page = requests.get(url)

soup = BeautifulSoup(page.content, 'html.parser')

all_products = soup.find_all('article', class_='product_pod')

def access_url(url):
    page = requests.get(url)
    soup = BeautifulSoup(page.content, 'html.parser')
    return soup

def get_products(soup):
    return soup.find_all('article', class_='product_pod')
all_products = get_products(access_url(url))
print(all_products)
