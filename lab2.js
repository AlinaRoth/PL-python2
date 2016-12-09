var fs=require("fs");
var util=require("util");

function getOnly(e) {
  var result = [];

  if (typeof e != 'undefined') {
    for (i = 0; i < e.length; i++){
      if (result.indexOf(e[i]) == -1) {
          result.push(e[i])
      }
    }
  }

  return result;
}

var IPs = [];
var subnets = [];

re=/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/;

fs.open("access.log", "r", 0644, function(err, file_handle) 
{
	if (!err) 
	{
   		var log = fs.readFileSync(file_handle, 'utf8');

		var pageIps = log.match(/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/ig);
        IPs = getOnly(pageIps);
        
		for(i=0; i<IPs.length; i++) {
            var subnet = IPs[i].split('.')[0] + "."
            + IPs[i].split('.')[1]+"."+IPs[i].split('.')[2];

            if (subnets.length == 0) {
                var newSubnet = { net: subnet, ips: [] }
                newSubnet.ips.push(IPs[i])
                subnets.push(newSubnet);
            }
            else {
                var isFound = false;
                for (j = 0; j < subnets.length; j++) {
                    if (subnets[j].net == subnet) {
                        subnets[j].ips.push(IPs[i])
                        isFound = true;
                    }
                }
                if (!isFound) {
                    var newSubnet = { net: subnet, ips: [] }
                    newSubnet.ips.push(IPs[i])
                    subnets.push(newSubnet);
                }
            }
		}

        console.log("IPs:" + IPs.length, "; subents: " + subnets.length);
        for (i = 0; i < subnets.length; i++) {
            console.log("Subnet: " + subnets[i].net);
            for (j = 0; j < subnets[i].ips.length; j++) {
                console.log(subnets[i].ips[j]);
            }
            console.log("");
        }
        console.log("IPs:" + IPs.length, "; subents: " + subnets.length);
	}
});