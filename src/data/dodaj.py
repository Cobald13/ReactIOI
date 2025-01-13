from pymongo import MongoClient

# Connect to your MongoDB database
client = MongoClient("mongodb+srv://Cobald13:Mp5K1Ll5@projektioi.o1jsd.mongodb.net/?retryWrites=true&w=majority&appName=projektIOI")
db = client["IOI"]  # Replace with your database name
painters_collection = db["Slikarji"]  # Replace with your collection name

# New painting to add
new_painting = {
  "id": "riba",
  "title": "Riba (1986)",
  "description": "Tempera na ročno izdelanem papirju, 261 x 399 mm, sign. in dat. d. sp.: Music 86. NG G 8253, Narodna galerija, Ljubljana. 'Riba' je del serije tihožitij Zorana Mušiča, v katerih pogosto upodablja morske sadeže, kot so ribe in školjke. Ta motiv je bil za umetnika značilen že v tridesetih in štiridesetih letih 20. stoletja, ko je raziskoval srebrn lesk lusk na sardelah in slanikih. V osemdesetih letih je svoje motive nadgradil v izrazite barvne študije, kot je 'Riba'.\n\nNa dragocenem, najverjetneje japonskem ročno izdelanem papirju je Mušič s tempero upodobil veliko rdečo ribo na ovalnem srebrnem krožniku. Barvna paleta temelji na zlato oranžnih tonih, ki so postavljeni na sivo-črno-rjavem ozadju. Groba tekstura papirja dodatno bogati kompozicijo in poudarja umetnikovo mojstrstvo v izbiri materialov in tehnik.\n\nDelo je bilo Narodni galeriji podarjeno kot del donacije Ljubana, Milade in Vande Mušič in odraža umetnikovo zrelost ter prefinjen občutek za tihožitje.",
  "imageSrc": "https://github.com/Cobald13/ReactIOI/blob/main/public/images/muzic_riba.jpg",
  "videoSrc": "https://cobald13.github.io/ReactIOI/public/video/muzic_riba.mp4"
}

# Append the new painting to the 'paintings' array
result = painters_collection.update_one(
    {"_id": "music"},  # Find the document with _id "kobilca"
    {"$push": {"paintings": new_painting}}  # Append to the paintings array
)

if result.modified_count > 0:
    print("Painting added successfully!")
else:
    print("No document updated. Check the _id or the query.")
