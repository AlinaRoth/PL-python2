import re
File = open('access.log' , 'r')
Output = re.findall(r'(([\d]{1,3}\.[\d]{1,3}\.[\d]{1,3})\.[\d]{1,3})[ ]' , File.read())
Subnets = []
Ips = []
ch1 = 0
ch2 = 0
for i in range(len(Output)):
	ch2 = 0
	ch1 = 0
	for j in range(len(Subnets)):
		if Subnets[j] == Output[i][1]:
			ch1 = 1
	if ch1 == 0:
		Subnets.append(Output[i][1])
	for g in range(len(Ips)):
		if Output[i][0] == Ips[g]:
			ch2 = 1
	if ch2 == 0:
		Ips.append(Output[i][0])

for i in range(len(Subnets)):
	print('subnet: ' + Subnets[i] + '\n')
	Pat = re.compile(Subnets[i])
	for j in range(len(Ips)):
		if Pat.search(Ips[j]):
			print(Ips[j] + '\n')
