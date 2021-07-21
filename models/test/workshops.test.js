const Workshop = require('../workshop.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Workshop', () =>{
  
  it('should throw an error if no "name" and "concertId" arg', () => {
    const wShop = new Workshop({});
    wShop.validate(err => {
      expect(err.errors.name).to.exist;
      expect(err.errors.concertId).to.exist;
    });
  });

  it('should throw an error if is not a string', () => {
    const wShop = new Workshop({name: [], concertId: {}});
    wShop.validate(err => {
      expect(err.errors.name).to.exist;
      expect(err.errors.concertId).to.exist;
    });
  });

  it('should throw an error if not all arguments are in', () => {
    const cases = [{ name: 'John' }, { concertId: '23' }];
    for(let type of cases){
      const workShop = new Workshop(type);
      workShop.validate(err => {
        expect(err.errors).to.exist;
      });
    }
});
  
  it('should not throw an error if "name" and "concertId" are correct', () => {
    const wShop = new Workshop({name: 'John', concertId: '23'});
    wShop.validate(err => {
      expect(err).to.not.exist;
    });
  });

  after(() => {
    mongoose.models = {};
  });

});
