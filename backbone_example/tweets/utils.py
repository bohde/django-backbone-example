from hashlib import md5

def gravatar(email):
    return md5(email.strip().lower()).hexdigest()
