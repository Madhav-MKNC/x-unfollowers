import requests

r = requests.post(
    url="https://x-unfollowers.gamhcrew.repl.co/",
    json={  # Use the json parameter instead of data
        'followers': [
            'mknc',
            'madhav',
            'other_me'
        ]
    }
)

print(r.text)
