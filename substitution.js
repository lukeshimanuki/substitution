var defaultRules = "witnesses : these dudes I know ;\nallegedly : kinda probably ;\nnew study : tumblr post ;\nrebuild : avenge ;\nspace : spaaace ;\ngoogle glass : virtual boy ;\nsmartphone : pokedex ;\nelectric : atomic ;\nsenator : elf-lord ;\ncar : cat ;\nelection : eating contest ;\ncongressional leaders : river spirits ;\nhomeland security : homestar runner ;\ncould not be reached for comment : is guilty and everyone knows it ;";

function doStuff()
{
	// load rules from storage
	var rulesStr;
	chrome.storage.sync.get({rules: defaultRules}, function (args)
	{
		rulesStr = args.rules;
		
		// parse string into array
		var pattern = "";
		var replacement = "";
		var patternOrReplacement = true; // t: pattern f: replacement
		var rules = [];
		for (var i = 0; i < rulesStr.length; i++)
		{
			var c = rulesStr.charAt(i);
			switch (c)
			{
				case ':':
					pattern = pattern.trim();
					patternOrReplacement = false;
					break;
				case ';':
					replacement = replacement.trim();
					rules[rules.length] = [RegExp(pattern, 'gi'), replacement];
					pattern = "";
					replacement = "";
					patternOrReplacement = true;
					break;
				default:
					if (c == '\n')
					{
						c = ' ';
					}
					if (patternOrReplacement)
					{
						pattern = pattern.concat(c);
					}
					else
					{
						replacement = replacement.concat(c);
					}
					break;
			}
		}

		// apply rules to webpage
		process(document.body, rules);
	});

}

function process(node, rules)
{
	if (rules == undefined)
	{
		return;
	}

	// define HTML DOM nodeType constants
	var nodeType = 
	{
		Element : 1,
		Attribute : 2,
		Text : 3,
		CData : 4,
		EntityReference : 5,
		Entity : 6,
		ProcessingInstruction : 7,
		Comment : 8,
		Document : 9,
		DocumentType : 10,
		DocumentFragment : 11,
		Notation : 12
	};

	// determine wheter it is text or has children
	switch (node.nodeType)  
	{
		case nodeType.Text:
			// it has text, so apply substitutions
			// cache text for easier usage
			var text = node.nodeValue;

			// cycle through rules
			for (var i = 0; i < rules.length; i++)
			{
				// indice 0 is pattern, indice 1 is replacement
				// substitute
				text = text.replace(rules[i][0], rules[i][1]);
			}

			// copy text back to its source
			node.nodeValue = text;
			break;
		case nodeType.Element:
		case nodeType.Document:
		case nodeType.DocumentFragment:
			// it has children, so process each child
			var thisChild = node.firstChild;
			while (thisChild) 
			{
					var sibling = thisChild.nextSibling;
					process(thisChild, rules);
					thisChild = sibling;
			}
			break;
		default:
			break;
	}
}

doStuff();
