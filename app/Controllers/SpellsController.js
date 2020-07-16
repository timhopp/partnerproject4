import SpellsService from "../Services/SpellsService.js";
import store from "../store.js";

//Private
function _draw() {
  let template = ''
  let spells = store.State.wildspells;
  console.log(spells);
  spells.forEach(spell => template += spell.Template)
  document.getElementById('wildspells').innerHTML = template
}

function _drawActive(){
  document.getElementById('activespell').innerHTML = store.State.activespell.activeTemplate
}

function _drawMySpells() {
  let template = ''
  let spells = store.State.myspells;
  console.log(spells);
  spells.forEach(spell => template += spell.activeTemplate)
  document.getElementById('myspells').innerHTML = template
}

//Public
export default class SpellsController {
  constructor() {
    store.subscribe("wildspells", _draw);
    store.subscribe('activespell', _drawActive)
    store.subscribe('myspells', _drawMySpells)
    console.log('hi from controller')
  }

  addActive(activeId){
  SpellsService.addActive(activeId)
}
  addMySpell(spellId){
    SpellsService.addMySpell()
  }


}
