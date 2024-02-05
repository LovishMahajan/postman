const request = require("postman-request");
const _=require("lodash");


const postmanUrl = "https://api.getpostman.com";
const apiKey =
	"";

const collectionId = "";

const options = {
	url: `${postmanUrl}/collections/${collectionId}`,
	headers: {
		"X-Api-Key": apiKey,
	},
};

exports.fetchPCollections = async (otp) => {
	request.get(options, (error, response, body) => {
		if (error) {
			console.error(error);
		} else {
            const collectionScript = {
                type: 'text/javascript',
                exec: `pm.collectionVariables.set("otp", ${otp} );`,
              };
              const collection = JSON.parse(body).collection;
              collection.events = collection.events || [];
          
              // Update the `test` property of the collection object with the new script
              collection.events.push({
                listen: 'prerequest',
                script: collectionScript,
              });
              updateCollection(collection);
		}
	});
};

function updateCollection(collection) {
	const options = {
		url: `${postmanUrl}/collections/${collectionId}`,
		headers: {
			"X-Api-Key": apiKey,
			"Content-Type": "application/json",
		},
		json: {
			collection,
		},
	};

	request.put(options, (error, response, body) => {
		if (error) {
			console.error(error);
		} else {
			console.log(body);
		}
	});
}
