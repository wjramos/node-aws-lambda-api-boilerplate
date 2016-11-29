import request from 'request-promise';
import { DOMParser, XMLSerializer } from 'xmldom';

let serializer;
let parser;

export async function fetch( url ) {
  return await request( url );
}

export function parseHtml( html = '' ) {
  parser = parser || new DOMParser();
  return parser.parseFromString( html, 'text/html' );
}

export function serializeHtml( doc ) {
  serializer = serializer || new XMLSerializer();
  const head = doc.getElementsByTagName('head')[0];
  return serializer.serializeToString( doc );
}

export function injectHeadScript( doc, script ) {
  const tag = doc.createElement('script');
  const head = doc.getElementsByTagName('head')[0];
  head.appendChild(tag);
  const last = head.childNodes.length - 1;
  head.childNodes[last].setAttribute('type', 'text/javascript');
  head.childNodes[last].textContent = script;
  return doc;
}
