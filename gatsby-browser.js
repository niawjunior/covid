import "./src/styles/globals.css"

export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    `เว็บไซต์ มีการ update ` + `ต้องการ refresh หน้าเว็บใหม่หรือไม่?`
  )
  if (answer === true) {
    window.location.reload()
  }
}
