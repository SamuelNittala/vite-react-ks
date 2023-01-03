export const getUsers = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const sleep = (ms : number) => new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, ms);
  }) 
  // await sleep(4000);
  return res.json();;
}
