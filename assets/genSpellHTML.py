import os
html = '''<ul class="spell-container container-fluid">'''
for filepath in os.listdir("spell_data"):
    with open("spell_data/" + filepath, encoding="UTF-8") as f:
        data = [t.strip() for t in f.readlines()]
        # print(data)
        spell_name = data[2][9:-1]
        spell_tags = data[5][7:-1]
        spell_level = data[8].strip("*")
        spell_cast = data[10][19:]
        spell_range = data[12][12:]
        spell_comp = data[14][17:]
        spell_dur = data[16][15:]
        spell_desc = "\n".join(data[18:])
        spell_dict = {
            "name": spell_name,
            "tags": spell_tags,
            "level": spell_level,
            "cast": spell_cast,
            "range": spell_range,
            "comp": spell_comp,
            "dur": spell_dur,
            "desc": spell_desc
        }
        html += '''
        <li class="spell" data-tags="{tags}">
            <div class="spell-name">{name}</div>
            <div class="spell-level">{level}</div>
            <ul class="spell-info-box">
                <li class="spell-info"><span class="spell-icon glyphicon glyphicon-cog"></span> {cast}</li>
                <li class="spell-info"><span class="spell-icon glyphicon glyphicon-hourglass"></span> {dur}</li>
                <li class="spell-info"><span class="spell-icon glyphicon glyphicon-asterisk"></span> {comp}</li>
                <li class="spell-info"><span class="spell-icon glyphicon glyphicon-screenshot"></span> {range}</li>
            </ul>
            <div class="spell-desc">{desc}</div>
        </li>'''.format(**spell_dict)
        # print(filepath)
# print(spell_dict)
html += "</ul>"
with open("grimoire_spells.html", 'w', encoding='UTF-8') as f:
    f.write(html)
