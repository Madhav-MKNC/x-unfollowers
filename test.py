import requests

url = ""
r = requests.post(
    url=url,
    json={  # Use the json parameter instead of data
        'followers': [
            'mknc',
            'madhav',
            'other_me'
        ]
    }
)

print(r.text)
