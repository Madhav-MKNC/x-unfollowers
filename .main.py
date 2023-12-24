# Run script4.js in chrome console as https://twitter.com/5mknc5/followers
# for fetching current followers list
current = ...

previous = ['KYL9038', 'aryan99871', 'Markah2023', 'theboringmates', 'joshan_arun', 'AndrewOctal', 'SeshingPM', 'ISRARD1USA', '_arohit_', 'AJK_TX', 'aleksandar_va', 'AJphoton', 'CaseyObrayn', 'TEAMMAGAKI50985', 'Sarah_Maga24', 'WarhammerHeresy', 'goldbella778', 'swiftiemootstwt', 'trnanhv84777430', 'YoungBossSwagg', 'Laurencewill_', 'indievish', 'abhilashc1981', 'Crypto_Ally', 'panda_story_', 'kamon', 'AI_Comix', 'AmirReiter', 'jcf1370', '0xVenky', 'MihaLotric', 'AboveRealty', 'AnujKumar00001', 'Nitinbh11589153', 'NoobCoder14', 'Evangeline8088', 'parentingJapan', 'Ai_Future9', 'seeteatoa82395', 'NishaJones29422', 'paula_reid88', 'ku00019', 'zilliz_universe', 'milvusio', 'saksham650', 'm_areeb_23', 'nishantsh2002', 'harshil1170', '0xmonsoon', 'AdarshK43393714', 'Demiros75976385', 'eloy03137001', 'rokiahassan36']

unfollowers = [ye for ye in previous if ye not in current]
new_followers = [ye for ye in current if ye not in previous]

print(f"> Total Followers: {len(current)}")
if unfollowers:
    print("-----------------------------------")
    print(f"> {len(unfollowers)} unfollowers")
    for i in unfollowers:
        print(f"https://twitter.com/{i}")
if new_followers:
    print("-----------------------------------")
    print(f"> {len(new_followers)} new followers")
    print("------------------")
    for i in new_followers:
        print(f"https://twitter.com/{i}")
else:
    print("-----------------------------------")
    print("Nobody unfollowed.")
