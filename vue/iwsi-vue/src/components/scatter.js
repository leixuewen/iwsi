import ScatterJS from 'scatterjs-core'
import ScatterEOS from 'scatterjs-plugin-eosjs'
import Eos from 'eosjs'

ScatterJS.plugins(new ScatterEOS())
const network = {
  blockchain: 'eos',
  protocol: 'https',
  host: 'nodes.get-scatter.com',
  port: 443,
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
}
ScatterJS.scatter.connect('My-App').then(connected => {
  if (!connected) {
    return false
  }
  const scatter = ScatterJS.scatter
  const requiredFields = {accounts: [network]}
  scatter.getIdentity(requiredFields).then(() => {
    const account = scatter.identity.accounts.find(x => x.blockchain === 'eos')
    const eosOptions = {expireInSeconds: 60}
    const eos = scatter.eos(network, Eos, eosOptions)
    const transactionOptions = {authorization: [`${account.name}@${account.authority}`]}
    eos.transfer(account.name, 'helloworld', '1.0000 EOS', 'memo', transactionOptions).then(trx => {
      console.log(`Transaction ID: ${trx.transaction_id}`)
    }).catch(error => {
      console.error(error)
    })
  }).catch(error => {
    console.error(error)
  })
})
