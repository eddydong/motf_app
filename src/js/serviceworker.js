// Ensure that the browser supports the service worker API 
if (navigator.serviceWorker) { 
    // Start registration process on every page load 
    window.addEventListener('load', () => { 
        navigator.serviceWorker 
            // The register function takes as argument 
            // the file path to the worker's file 
            .register('./src/js/serviceworker.js') 
            // Gives us registration object 
            .then(reg => console.log('Service Worker Registered')) 
            .catch(swErr => console.log( 
                  `Service Worker Installation Error: ${swErr}}`)); 
      }); 
  } 

var cacheName = 'motf-cache-v1'; 
const sampleURL = SERVER+"/src/sample/";
var cacheAssets = [ 
    sampleURL+'upright_bass/E2.wav', 
    sampleURL+'upright_bass/A2.wav', 
    sampleURL+'upright_bass/D3.wav', 
    sampleURL+'upright_bass/E3.wav', 
    sampleURL+'upright_bass/A3.wav', 
    sampleURL+'upright_bass/C4.wav', 
    sampleURL+'upright_bass/F4.wav', 
]; 
  
// Call install Event 
self.addEventListener('install', e => { 
    // Wait until promise is finished  
    e.waitUntil( 
        caches.open(cacheName) 
        .then(cache => { 
            console.log(`Service Worker: Caching Files: ${cache}`); 
            cache.addAll(cacheAssets) 
                // When everything is set 
                .then(() => self.skipWaiting()) 
        }) 
    ); 
}) 

// Call Activate Event 
self.addEventListener('activate', e => { 
	console.log('Service Worker: Activated'); 
	// Clean up old caches by looping through all of the 
	// caches and deleting any old caches or caches that 
	// are not defined in the list 
	e.waitUntil( 
		caches.keys().then(cacheNames => { 
			return Promise.all( 
				cacheNames.map( 
					cache => { 
						if (cache !== cacheName) { 
							console.log('Service Worker: Clearing Old Cache'); 
							return caches.delete(cache); 
						} 
					} 
				) 
			) 
		}) 
	); 
}) 

// Call Fetch Event 
self.addEventListener('fetch', e => { 
	console.log('Service Worker: Fetching'); 
	e.respondWith( 
		fetch(e.request) 
		.then(res => { 
			// The response is a stream and in order the browser 
			// to consume the response and in the same time the 
			// cache consuming the response it needs to be 
			// cloned in order to have two streams. 
			const resClone = res.clone(); 
			// Open cache 
			caches.open(cacheName) 
				.then(cache => { 
					// Add response to cache 
					cache.put(e.request, resClone); 
				}); 
			return res; 
		}).catch( 
			err => caches.match(e.request) 
			.then(res => res) 
		) 
	); 
}); 
