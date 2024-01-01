/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "9b6a888002eb2a498850351d2eb75dc4"
  },
  {
    "url": "assets/css/0.styles.afe990ab.css",
    "revision": "0f01a6fb84e4d5c84e0343d1f827cf6a"
  },
  {
    "url": "assets/img/create.40c7e834.png",
    "revision": "40c7e83491cdb768451a04933a8e2dda"
  },
  {
    "url": "assets/img/del-one.28a8bc73.png",
    "revision": "28a8bc73c2786f91ee623abbc174918c"
  },
  {
    "url": "assets/img/get-all.67899a14.png",
    "revision": "67899a140e491c931bdce378111a3a86"
  },
  {
    "url": "assets/img/get-one.e13f6313.png",
    "revision": "e13f63133cfab9adeea5363ebfb3409a"
  },
  {
    "url": "assets/img/logo.193df479.svg",
    "revision": "193df4790701299e797484019cd2a5a5"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/start.9fab5ba2.png",
    "revision": "9fab5ba26d92adb9e4aa0a2f3c4bae70"
  },
  {
    "url": "assets/img/update-one.7ce0a7af.png",
    "revision": "7ce0a7aff677301c4fbb78267650bff4"
  },
  {
    "url": "assets/js/1.5577e7f8.js",
    "revision": "ba56e0174cdb63088380b5bf18a468ea"
  },
  {
    "url": "assets/js/10.1f8e435c.js",
    "revision": "e065eca5ea686ec9f05f4e15eeee584a"
  },
  {
    "url": "assets/js/13.0a808b2b.js",
    "revision": "a58acdab87c267d892cf468de8f9f174"
  },
  {
    "url": "assets/js/14.f190ac62.js",
    "revision": "e89e589a37d15f8068a14f6916fadda0"
  },
  {
    "url": "assets/js/15.5d41deef.js",
    "revision": "d4cdcd7c4140936caa5c94fc38995202"
  },
  {
    "url": "assets/js/16.57e13c96.js",
    "revision": "c771e78dda038fee3c6cffc6fc75593d"
  },
  {
    "url": "assets/js/17.b0d2d069.js",
    "revision": "527a940991531bd7bd21b01c81b5002f"
  },
  {
    "url": "assets/js/18.87e928c0.js",
    "revision": "bbb5324ef6e43f82adfa27c2d68617c3"
  },
  {
    "url": "assets/js/19.b6c25579.js",
    "revision": "1d8009d21dee4e2b7ae117bd2a875bd6"
  },
  {
    "url": "assets/js/2.7d7dbddd.js",
    "revision": "a5625332c8adca85eb2c82a54a51ecce"
  },
  {
    "url": "assets/js/20.824c164a.js",
    "revision": "fa14f4d8c52f87ed7b2c269f9ab2cb10"
  },
  {
    "url": "assets/js/21.b605a340.js",
    "revision": "4c2115da4e051343f8ab9cb3fde72bc2"
  },
  {
    "url": "assets/js/22.2dbb6168.js",
    "revision": "86739ba2c8d5f97798c8a2b5f0917e8e"
  },
  {
    "url": "assets/js/23.58437d1a.js",
    "revision": "3636d07661d819dd921896e4b29bad34"
  },
  {
    "url": "assets/js/24.1d5758b5.js",
    "revision": "6c323b1cde5a479d65ee5ffb27663663"
  },
  {
    "url": "assets/js/25.718ac426.js",
    "revision": "d991b2f33832e46ad0e8cb036b7aa81d"
  },
  {
    "url": "assets/js/26.16cb992f.js",
    "revision": "33d158f99c35bac05be3b57893792c98"
  },
  {
    "url": "assets/js/27.d8475d26.js",
    "revision": "3d9406c62d77deef595f9734280e8e89"
  },
  {
    "url": "assets/js/28.f879fb2e.js",
    "revision": "2e53b2daae36d621384a2424babdf65d"
  },
  {
    "url": "assets/js/29.23371cba.js",
    "revision": "5e57502de83c53ff96329bba2a0a8eb0"
  },
  {
    "url": "assets/js/3.3ce44eb7.js",
    "revision": "99bbe5585ad1772209b9b8b87908ffb0"
  },
  {
    "url": "assets/js/30.85566b11.js",
    "revision": "a550e26a5566656c92dda27a99b382ca"
  },
  {
    "url": "assets/js/31.529e9731.js",
    "revision": "8973e5d9c618a0da48aef00914d0fc55"
  },
  {
    "url": "assets/js/32.12c16a19.js",
    "revision": "1348f8f70368afc08925ed419b7b7614"
  },
  {
    "url": "assets/js/33.50b3b9d6.js",
    "revision": "800220285f75b6e459645ede93592cc2"
  },
  {
    "url": "assets/js/34.99d7dc1a.js",
    "revision": "444dc3efb8cdc8144d5df2db66ddbcb3"
  },
  {
    "url": "assets/js/35.63d072d2.js",
    "revision": "876123cb4906e5e03c4e64db95c8220b"
  },
  {
    "url": "assets/js/36.dddf8770.js",
    "revision": "d5bed2428c85bad117418b65ee0c6e3c"
  },
  {
    "url": "assets/js/37.f38317ce.js",
    "revision": "3bf4b88a34eb1b4f0e6cc779aa8a85f9"
  },
  {
    "url": "assets/js/38.3ae2128f.js",
    "revision": "53b033a310b4fe376686df0841125250"
  },
  {
    "url": "assets/js/39.649d92b0.js",
    "revision": "488e66e413cec6f045d6c2214b66511d"
  },
  {
    "url": "assets/js/4.4c4472f5.js",
    "revision": "48e6efff84dfc9633bfeb464fb7aaf1a"
  },
  {
    "url": "assets/js/41.3fe40e51.js",
    "revision": "d33b8fe489e7938b5294cab96d1a7faf"
  },
  {
    "url": "assets/js/5.fa775c3e.js",
    "revision": "91c9abe11eda00a87af1a4408b1c8409"
  },
  {
    "url": "assets/js/6.d26b4d2c.js",
    "revision": "d5d778a29b099b4480c33547ac3651a3"
  },
  {
    "url": "assets/js/7.99d80768.js",
    "revision": "70a552088b98d19277c3b95880123258"
  },
  {
    "url": "assets/js/8.e39ef453.js",
    "revision": "a53498e9ae2cf834bc30d2c44c3c0be4"
  },
  {
    "url": "assets/js/9.1a9c7768.js",
    "revision": "b344120c5d163a728ce559cce35eac92"
  },
  {
    "url": "assets/js/app.405ef9af.js",
    "revision": "d0c3447ea7e68853a6cc82821e0dc54e"
  },
  {
    "url": "assets/js/vendors~docsearch.2d737b4b.js",
    "revision": "294b247c6ab62b4e7e84055aafee5eb6"
  },
  {
    "url": "conclusion/index.html",
    "revision": "b8efed059266d82a2bc69656f8f4cee4"
  },
  {
    "url": "design/index.html",
    "revision": "db582a3bbee9f6fdbb10b39ba1b422d5"
  },
  {
    "url": "index.html",
    "revision": "b46473f92a650a3371d311e395b1d45b"
  },
  {
    "url": "intro/index.html",
    "revision": "8ee388243a9c5e1433b038e2871d0cd6"
  },
  {
    "url": "license.html",
    "revision": "c6ae94487788630ac26fdec72cecb7f2"
  },
  {
    "url": "myAvatar.png",
    "revision": "b76db1e62eb8e7fca02a487eb3eac10c"
  },
  {
    "url": "requirements/index.html",
    "revision": "ba628941724f7fe0de00bbfdbc1d464c"
  },
  {
    "url": "requirements/stakeholders-needs.html",
    "revision": "1268436e41069113dc572773b40a081d"
  },
  {
    "url": "requirements/state-of-the-art.html",
    "revision": "d3d2f9eafbde2a5ac8ae76505a00fa8c"
  },
  {
    "url": "software/index.html",
    "revision": "32ff98f05ebc8f9c9ed46504b2c4a318"
  },
  {
    "url": "test/index.html",
    "revision": "c0a3fec99dd37373965118145b776f3e"
  },
  {
    "url": "use cases/index.html",
    "revision": "ea6d98cc88745285a4b7bd3d122b166f"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
