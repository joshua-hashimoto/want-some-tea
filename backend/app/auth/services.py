from passlib.hash import bcrypt


def get_password_hash(password):
    return bcrypt.hash(password)
