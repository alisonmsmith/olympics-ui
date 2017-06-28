import csv
import numpy
import copy
import json

names = []
answers = []
similarity_matrix = numpy.zeros((36,36))
with open('data/results.csv') as csvfile:
	reader = csv.DictReader(csvfile)
	
	for row in reader:
		#print row["What's your name and number? Ok, just your name."]

		# store the name and the answers
		names.append(row["What's your name and number? Ok, just your name."])

		row_answers = []
		
		# 2 points for multiple choice matches (16 points)
		row_answers.append(row["Favorite clothing material/pattern?"])
		row_answers.append(row["Would you rather be a "])
		row_answers.append(row["Favorite country?"])
		row_answers.append(row["What song would you represent?"])
		row_answers.append(row["What is your favorite drinking event outside of beer olympics?"])
		row_answers.append(row["What is your favorite holiday?"])
		row_answers.append(row["Which prior-olympian-who-is-no-longer-with-us-but-not-because-they-are-dead-but-because-they-just-couldn't-make-it will you miss most?"])
		row_answers.append(row["Favorite light beer"])

		# 3 points for open ended matches (12 points)
		row_answers.append(row["Which tv show would you like to be on and why?"])
		row_answers.append(row["tv category"])

		row_answers.append(row["What did you want to be when you grew up?"])
		row_answers.append(row["job category"])

		row_answers.append(row["What is your favorite animal?"])
		row_answers.append(row["animal category"])

		row_answers.append(row["What is your preferred alcohol consumption method?"])
		row_answers.append(row["drinking category"])


		answers.append(row_answers);


	#for name in names:
	#	similarity_matrix[name] = names
	
	#print(row['What is your favorite drinking event outside of beer olympics?'], row["What's your name and number? Ok, just your name."])

# loop over all competitors
for i, row in enumerate(answers):
	# for each competitor, determine their similarity to curren competitor
	for j, row2 in enumerate(answers):
		score = 0
		if i == j:
			score = 28
		else :
			# go through all questions
			for k, answer in enumerate(row):
				if k < 8 and answer == row2[k]:
					score = score + 2
			
			# the rest of the questions are multiple choice, so handle them differently
			for t in range(8,15,2):
				answer = row[t]
				category = row[t+1]

			if answer == row2[t]:
				score = score + 3
			else:
				if category == row2[t+1]:
					score = score + 2


		similarity_matrix[i][j] = (score/28.0) * 100.0
		if (similarity_matrix[i][j] < 100):
			similarity_matrix[i][j] = 1.5*similarity_matrix[i][j];

for i in range(0,36):
	for j in range(0,36):
		if similarity_matrix[i][j] >= 50 and similarity_matrix[i][j] < 100:
			print names[i]
			print names[j]
			print similarity_matrix[i][j]
			print "------"

similarity_map = {}

for i in range(0,36):
	similarity_map[names[i]] = sorted(zip(similarity_matrix[i], names), key=lambda competitor: competitor[0], reverse=True)

print json.dumps(similarity_map)

#print "steve"
#for i, score in enumerate(similarity_matrix[0]):
#	print names[i]
#	print score
#print json.dumps(sorted(zip(similarity_matrix[0], names), key=lambda competitor: competitor[0]))


#print "ali"
#print sorted(zip(similarity_matrix[1], names), key=lambda competitor: competitor[0])

#print "dan"
#print sorted(zip(similarity_matrix[5], names), key=lambda competitor: competitor[0])


#print "jess"
#print sorted(zip(similarity_matrix[10], names), key=lambda competitor: competitor[0])


#print "kevin"
#print sorted(zip(similarity_matrix[23], names), key=lambda competitor: competitor[0])


#print "andrew"
#print json.dumps({"andrew":sorted(zip(similarity_matrix[20], names), key=lambda competitor: competitor[0])})

