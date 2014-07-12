var defaultRules = "witnesses : these dudes I know ;\nallegedly : kinda probably ;\nnew study : tumblr post ;\nrebuild : avenge ;\nspace : spaaace ;\ngoogle glass : virtual boy ;\nsmartphone : pokedex ;\nelectric : atomic ;\nsenator : elf-lord ;\ncar : cat ;\nelection : eating contest ;\ncongressional leaders : river spirits ;\nhomeland security : homestar runner ;\ncould not be reached for comment : is guilty and everyone knows it ;";

function load()
{
	// read rules from stored file
	var rules;
	chrome.storage.sync.get({rules: defaultRules}, function (args)
	{
		document.getElementById("rules").value = args.rules;
	});
}
 
function save()
{
	chrome.storage.sync.set({rules: document.getElementById("rules").value});
}
 
function loadDefaults()
{
	document.getElementById("rules").value = defaultRules;
}

document.addEventListener("DOMContentLoaded", load);
document.getElementById("save").addEventListener("click", save);
document.getElementById("loadDefaults").addEventListener("click", loadDefaults);
