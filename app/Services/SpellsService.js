import store from "../store.js";
import Spell from "../Models/Spells.js";
import SpellsController from "../Controllers/SpellsController.js";

// @ts-ignore
const _api = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/spells",
  timeout: 3000,
});

// @ts-ignore
const _myApi = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/timmy/spells",
  timeout: 5000,
});

class SpellsService {
  constructor() {
    console.log("hi from service");
    this.getWildSpells();
    this.getMySpells();
    // store.subscribe('activespell', this.addActive)
  }
  addMySpell() {
    let index = store.State.myspells.findIndex(spell => spell.name == store.State.activespell.name)
    console.log("addmyspell",index)
    if(index < 0){
      debugger
      store.State.activespell.description = store.State.activespell.description.join('')
    _myApi.post('', store.State.activespell).then(res =>{
      this.getMySpells()
      console.log("addmyspell", store.State.myspells)}).catch(err => console.error(err)) 
    }
  }

  getMySpells(){
 _myApi.get('').then(res => {
   store.commit("myspells", res.data.data.map(spell => new Spell(spell)))
   console.log("getMySpeels",store.State.myspells)
 }

 )
  }
  addActive(activeId) {
    _api.get('/'+ activeId).then(res => {
      store.commit('activespell', new Spell(res.data))
      }).catch(err => console.error(err))

    // let active = store.State.wildspells.find((spell) => spell.id == activeId);
    // store.commit("activespell", active);
  }

  // addtoSpellBook(spellId){
  //    _myApi.post('', store.State.activespell).then(res =>{
  //      store.commit('myspells', res.data.map(spell => new Spell(spell)))
  //      console.log('getMyNeewSPeels', store.State.myspells)
  //    })

  // }

  getWildSpells() {
    _api.get("").then((res) => {
      store.commit(
        "wildspells",
        res.data.map((spell) => new Spell(spell))
      );
    });
  }
}

const service = new SpellsService();
export default service;
