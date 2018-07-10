import os
spell_list = []

for filepath in os.listdir("spell_data"):
    with open("spell_data/" + filepath, encoding="UTF-8") as f:
        data = [t.strip() for t in f.readlines()]
        # print(data)
        spell_name = data[2].replace('"', '').replace("title:", '').strip()
        spell_tags = data[5].split("[")[-1][:-1]
        # print(spell_tags)
        spell_level = data[8].strip("*")
        # print(filepath)
        # print(spell_level)
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
            spell_desc = "Materials: " + temp_spell_comp[idx + 1:-1] + "\n"
        else:
            spell_comp = temp_spell_comp
            spell_desc = ""
        spell_dur = data[16][14:]
        spell_desc += "\n".join(data[18:])
        spell = {
            "name": spell_name,
            "handle": spell_name.lower().replace(" ", "-").replace("/", "-"),
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
        spell_md = '''---\nlayout: post\ntitle: {name}\nsubtitle: {level}\ntags: [{tags}]\ncast: {cast}\nduration: {dur}\ncomponents: {comp}\nrange: {range}\n---\n{desc}'''.format(**spell)

        spell["md"] = spell_md
        spell_list.append(spell)

# sort list of spells by level, then by name
spell_list = sorted(spell_list, key=lambda k: (k['dlvl'], k['name']))
year = 0
for sp in spell_list[::-1]:
    with open("../_posts/{}-08-08-{}.md".format(str(year).zfill(4), sp["handle"]), 'w+', encoding='UTF-8') as f:
        f.write(sp["md"])
        year += 1
