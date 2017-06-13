import os
spell_list = []
html = '''<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Grimoire</title>
  <link href="https://fonts.googleapis.com/css?family=Cinzel|Open+Sans" rel="stylesheet">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
  <link rel="stylesheet" href="css/grimoire_style.css">
  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha256-k2WSCIexGzOj3Euiig+TlR8gA0EmPjuc79OEeY5L45g=" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tinysort/2.3.6/tinysort.min.js"> </script>
</head>

<body>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <a href="#" class="navbar-brand">Grimoire</a>
        <input class="navbar-search" type="text" placeholder="Search">
        <div class="toggle-filters btn glyphicon glyphicon-chevron-down" data-toggled=0></div>
      </div>
    </div>
  </nav>
  <ul class="spell-filters filters-hide">
    <li class="spell-filter" data-tags="cantrip">C</li>
    <li class="spell-filter" data-tags="level1">1</li>
    <li class="spell-filter" data-tags="level2">2</li>
    <li class="spell-filter" data-tags="level3">3</li>
    <li class="spell-filter" data-tags="level4">4</li>
    <li class="spell-filter" data-tags="level5">5</li>
    <li class="spell-filter" data-tags="level6">6</li>
    <li class="spell-filter" data-tags="level7">7</li>
    <li class="spell-filter" data-tags="level8">8</li>
    <li class="spell-filter" data-tags="level9">9</li>
    <li class="clear-filters glyphicon glyphicon-remove-sign"></li>
  </ul>
  <ul class="spell-filters filters-hide">
    <li class="spell-filter" data-tags="bard">Bard</li>
    <li class="spell-filter" data-tags="cleric">Cleric</li>
    <li class="spell-filter" data-tags="druid">Druid</li>
    <li class="spell-filter" data-tags="paladin">Paladin</li>
    <li class="spell-filter" data-tags="ranger">Ranger</li>
    <li class="spell-filter" data-tags="sorcerer">Sorcerer</li>
    <li class="spell-filter" data-tags="warlock">Warlock</li>
    <li class="spell-filter" data-tags="wizard">Wizard</li>
    <li class="clear-filters glyphicon glyphicon-remove-sign"></li>
  </ul>
  <ul class="container-fluid" id="spell-container">'''
for filepath in os.listdir("spell_data"):
    with open("spell_data/" + filepath, encoding="UTF-8") as f:
        data = [t.strip() for t in f.readlines()]
        # print(data)
        spell_name = data[2].replace('"', '').replace("title:", '').strip()
        spell_tags = data[5][7:-1]
        spell_level = data[8].strip("*")
        if "cantrip" in spell_level:
            data_lvl = "0"
            spell_lvl = "cantrip"
        else:
            data_lvl = spell_level[0]
            spell_lvl = "level" + spell_level[0]
        spell_cast = data[10][18:]
        spell_range = data[12][11:]
        temp_spell_comp = data[14][16:]
        if "(" in temp_spell_comp:
            idx = temp_spell_comp.find('(')
            spell_comp = temp_spell_comp[:idx - 1]
            spell_desc = "Materials: " + temp_spell_comp[idx + 1:-1] + "<br>"
        else:
            spell_comp = temp_spell_comp
            spell_desc = ""
        spell_dur = data[16][14:]
        spell_desc += "<br>".join(data[18:])
        spell = {
            "name": spell_name,
            "tags": spell_tags,
            "level": spell_level,
            "dlvl": data_lvl,
            "lvl": spell_lvl,
            "cast": spell_cast,
            "range": spell_range,
            "comp": spell_comp,
            "dur": spell_dur,
            "desc": spell_desc
        }
        spell_html = '''
        <li class="spell {lvl}" data-tags="{name}, {tags}">
            <div class="spell-name">{name}</div>
            <div class="spell-level">{level}</div>
            <ul class="spell-info-box">
                <li class="spell-info"><span class="spell-icon glyphicon glyphicon-cog"></span> {cast}</li>
                <li class="spell-info"><span class="spell-icon glyphicon glyphicon-hourglass"></span> {dur}</li>
                <li class="spell-info"><span class="spell-icon glyphicon glyphicon-asterisk"></span> {comp}</li>
                <li class="spell-info"><span class="spell-icon glyphicon glyphicon-screenshot"></span> {range}</li>
            </ul>
            <div class="spell-desc">{desc}</div>
        </li>'''.format(**spell)
        spell["html"] = spell_html
        spell_dict.append(spell)

# sort list of spells by level, then by name
spell_list = sorted(spell_list, key = lambda k: (k['dlvl'], k['name']))
for sp in spell_list:
    html += sp['html']

html += '''</ul>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
<script src="js/grimoire.js" type="text/javascript"></script>
</body>
</html>'''

with open("../grimoire.html", 'w', encoding='UTF-8') as f:
    f.write(html)
