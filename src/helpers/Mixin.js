/// http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
// Mixin maker
class MixinBuilder {
  constructor(superclass) {
    this.superclass = superclass;
  }

  // (spread operator, will pass everything from 0 to n)
  with(...mixins) {
    return mixins.reduce((c, mixin) => mixin(c), this.superclass);
  }

}

export default (superclass) => new MixinBuilder(superclass);