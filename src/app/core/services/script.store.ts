interface Scripts {
  name: string;
  src: string;
}
export const ScriptStore: Scripts[] = [
  {name: 'mp-sdk', src: 'https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js'},
  {name: 'mp-pay', src: '../../assets/js/mercadopago.js'}
];
