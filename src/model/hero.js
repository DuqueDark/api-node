class Hero{
    constructor({ name, age, power }){
        this.id = Math.floor(Math.random() * 100) + Date.now()
        this.name = name
        this.age = age
        this.power = power
    }
    isValid(){
        const propertyNames = Object.getOwnPropertyNames(this)
        const amountInvalid = propertyNames
            .map( property => (!!this[property]) ? null : `${property} is missing` )
            .filter( item => !!item )
            
        return{
            valid: amountInvalid.length === 0,
            err: amountInvalid
        }
    }
}
module.exports = Hero

// const hero = new Hero({id:1,name:'Chapolin',age:42,power:'Ser Incrivel'})
// console.log('valid ',hero.isValid())