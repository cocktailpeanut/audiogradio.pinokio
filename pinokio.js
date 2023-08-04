const os = require('os')
const fs = require('fs')
const path = require("path")
const exists = (filepath) => {
  return new Promise(r=>fs.access(filepath, fs.constants.F_OK, e => r(!e)))
}
module.exports = {
  title: "Audiocraft",
  description: "Text to audio, open sourced by Meta",
  icon: "icon.png",
  menu: async (kernel) => {
    let installed = await exists(path.resolve(__dirname, "audiocraft", "env"))
    if (installed) {
      let session = (await kernel.loader.load(path.resolve(__dirname, "session.json"))).resolved
      return [{
        when: "audiogen.json",
        on: "<i class='fa-solid fa-spin fa-circle-notch'></i> Audiogen Running",
        type: "label",
      }, {
        when: "audiogen.json",
        off: "<i class='fa-solid fa-power-off'></i> Start Audiogen",
        href: "audiogen.json?fullscreen=true&run=true",
      }, {
        when: "audiogen.json",
        on: "<i class='fa-solid fa-rocket'></i> Open Audiogen UI",
        href: (session && session.audiogen ? session.audiogen : "http://127.0.0.1:7860"),
        target: "_blank"
      }, {
        when: "musicgen.json",
        on: "<i class='fa-solid fa-spin fa-circle-notch'></i> Musicgen Running",
        type: "label",
      }, {
        when: "musicgen.json",
        off: "<i class='fa-solid fa-power-off'></i> Start Musicgen",
        href: "musicgen.json?fullscreen=true&run=true",
      }, {
        when: "musicgen.json",
        on: "<i class='fa-solid fa-rocket'></i> Open Musicgen UI",
        href: (session && session.musicgen ? session.musicgen : "http://127.0.0.1:7860"),
        target: "_blank"
      }]
    } else {
      return [{
        html: '<i class="fa-solid fa-plug"></i> Install',
        href: "install.json?run=true&fullscreen=true"
      }]
    }
  }
}
