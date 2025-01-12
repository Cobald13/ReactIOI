from pymongo import MongoClient

# Connect to your MongoDB database
client = MongoClient("mongodb+srv://Cobald13:Mp5K1Ll5@projektioi.o1jsd.mongodb.net/?retryWrites=true&w=majority&appName=projektIOI")
db = client["IOI"]  # Replace with your database name
painters_collection = db["Slikarji"]  # Replace with your collection name

# New painting to add
new_painting = {
  "id": "motiv_iz_holandije",
  "title": "Motiv iz Holandije",
  "description": "Olje na platnu, 30 x 48 cm, sign. d. sp.: M. JAMA. NG S 2019, Narodna galerija, Ljubljana. Slika prikazuje most iz 17. stoletja, imenovan Hoorn (Hoornbrug), ki se nahaja med Delftom in Haagom pri Rijswijku na kanalu Vliet. Kompozicija vključuje stolpasti mlin na veter, emblem Nizozemske, in raziskuje odseve na vodi, kar kaže na vpliv Moneta, ki je bil pomemben vir navdiha za Jamo v času njegovega prvega obiska Holandije leta 1910. Zrcalno obrnjena kompozicija je primerljiv način obravnave naravnih pojavov, značilnih za Jamovo delo v tem obdobju. Njegova interpretacija temelji na kombinaciji elementov iz nizozemskih in impresionističnih tradicij.",
  "imageSrc": "https://github.com/Cobald13/ReactIOI/blob/main/public/images/jama_motiv_iz_holandije.jpg",
  "videoSrc": "https://cobald13.github.io/ReactIOI/public/video/jama_motiv_iz_holandije.mp4"
}


# Append the new painting to the 'paintings' array
result = painters_collection.update_one(
    {"_id": "jama"},  # Find the document with _id "kobilca"
    {"$push": {"paintings": new_painting}}  # Append to the paintings array
)

if result.modified_count > 0:
    print("Painting added successfully!")
else:
    print("No document updated. Check the _id or the query.")
