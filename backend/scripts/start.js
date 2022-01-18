async function main() {
  const provider = hre.ethers.getDefaultProvider()
  const [owner, somebodyElse] = await hre.ethers.getSigners();
  const keyboardsContractFactory = await hre.ethers.getContractFactory("Keyboards");
  const keyboardsContract = await keyboardsContractFactory.deploy();
  await keyboardsContract.deployed();

  const keyboardTxn = await keyboardsContract.create(0, true, "sepia");
  const keyboardTxnReceipt = await keyboardTxn.wait();
  console.log(keyboardTxnReceipt.events);

  const tipTxn = await keyboardsContract.connect(somebodyElse).tip(0, {value: hre.ethers.utils.parseEther("1")})
  const tipTxnReceipt = await tipTxn.wait();
  console.log(tipTxnReceipt.events);

  keyboards = await keyboardsContract.getKeyboards();
  console.log("We got the keyboards!", keyboards);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
