export default class Demo {
  constructor( params = {} ) {
    this.params = params;
    return this.echo( params );
  }

  echo( params ) {
    const message = 'Handler was successful';
    return { message, params };
  }
}
