import functools
from flaskr.db import supabase
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)
bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/register')
def register():
    db_response = supabase.auth.sign_up(request.json)
    return db_response