---
layout: default # You can create a simple default layout
title: My Blog
---

# Blog Posts

<ul>
    {% for post in site.posts %}
    <li>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a> - {{ post.date | date_to_string }}
    </li>
    {% endfor %}
</ul>