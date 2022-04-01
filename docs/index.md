---
title: spiro-font
layout: home
---

# spiro-font

Like a spirograph, for fonts: Change the parameters, make something pretty, and waste time.

<style>
  td > p { display: inline; } /* Jekyll adds an extra <p>. */
</style>

<table class="table">
<thead>
<tr>
<th></th>
<th>upper</th>
<th>lower</th>
<th>number</th>
<th>Cyrillic</th>
</tr>
</thead>

<tbody>

{% for font in site.segmented %}
{% capture url %}{{ site.baseurl }}{{ font.url }}{% endcapture %}

<tr>
<td markdown="1">
[{{ font.name }}]({{ url }}) 
</td>
<td>{% if font.init.segmentMap['Z'] %} ✓ {% endif %}</td>
<td>{% if font.init.segmentMap['z'] %} ✓ {% endif %}</td>
<td>{% if font.init.segmentMap['9'] %} ✓ {% endif %}</td>
<td>{% if font.init.segmentMap['Я'] %} ✓ {% endif %}</td>
</tr>

{% endfor %}

</tbody>
</table>

[source code on github](https://github.com/mccalluc/spiro-font)