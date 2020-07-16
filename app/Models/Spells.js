export default class Spell {
    constructor(data) {
        this.id = data._id || data.id
        this.name = data.name 
        this.description = data.desc || data.description
        this.range = data.range
        this.duration = data.duration
        this.user = data.user || 'tim'

    }

    get Template() {
      let template = `
      <div class= "col-6 card bg-secondary rounded mt-3">
        <button class= "btn btn-success btn-block btn-large p-3 mt-3 mb-3" onclick="app.spellsController.addActive('${this.id}')">${this.name}</button>
     
      </div>
        `
        return template
    }

    get activeTemplate(){
        let template = `
        <div class = "col-12 card bg-secondary rounded mt-3">
        <h3>YOUR CHOSEN SPELL!!</h3>
        <p>${this.name}</p>
        <p>${this.duration}</p>
        <p>${this.description}</p>
        <button class = "btn btn-success btn-block btn-large p-3" onclick= "app.spellsController.addMySpell()">Add to Spell Book</button>
        </div>
        `
        return template
    }
}