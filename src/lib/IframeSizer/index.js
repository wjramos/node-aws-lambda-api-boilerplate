export default class IframeSizer {
  constructor( params = {} ) {
    return this.echo( params );
  }

  echo( params ) {
    const message = 'Handler was successful';
    return { message, params };
  }
}
