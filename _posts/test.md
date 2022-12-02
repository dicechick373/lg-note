---
title: 'GoogleCloudFunctionsでsitemap.xmlを作成してCloudStorageに保存する'
excerpt: 'GoogleCloudFunctionsでsitemap.xmlを作成してCloudStorageに保存する'
coverImage: '/assets/blog/dynamic-routing/cover.jpg'
date: '2022-10-01'
ogImage:
  url: '/assets/blog/dynamic-routing/cover.jpg'
tags:
  - 'Python'
  - 'GCF'
  - 'GCS'
---

https://stitches.dev/

# 目標
- GCFでsitemap.xmlを作成する
- GCSに保存する

# コード
## main.py

```py
import json
import xml.etree.ElementTree as ET
import datetime
import urllib.request
import os
import tempfile
from google.cloud import storage
storage_client = storage.Client()

def main(request):

    urlset = ET.Element('urlset')
    urlset.set('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
    urlset.set('xmlns:news', 'http://www.google.com/schemas/sitemap-news/0.9')
    urlset.set('xmlns:xhtml', 'http://www.w3.org/1999/xhtml')
    urlset.set('xmlns:mobile', 'http://www.google.com/schemas/sitemap-mobile/1.0')
    urlset.set('xmlns:image', 'http://www.google.com/schemas/sitemap-image/1.1')
    urlset.set('xmlns:video', 'http://www.google.com/schemas/sitemap-video/1.1')
    tree = ET.ElementTree(element=urlset)

    # 動的ルートのリスト設定
    routes = []

    for route in routes:
        url = 'https://statistics-hyogo.com'+route
        updated = datetime.date.today()
        updated = updated.strftime('%Y-%m-%d')
        url_element = ET.SubElement(urlset, 'url')
        loc = ET.SubElement(url_element, 'loc')
        loc.text = url
        lastmod = ET.SubElement(url_element, 'lastmod')
        lastmod.text = updated
        
    _, temp_local_filename = tempfile.mkstemp()
    tree.write(temp_local_filename, encoding='utf-8', xml_declaration=True)
        
        
    bucket = storage_client.bucket('statistics-hyogo')
    blob = bucket.blob('sitemap.xml')
    blob.upload_from_filename(temp_local_filename)
    os.remove(temp_local_filename)

    return 'sitemap.xml generated !!'

```

## requirements.txt

```txt
google-cloud-storage==1.23.0
```