import functools
from flaskr.db import supabase
from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for, jsonify
)
bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/register')
def register():
    try:
        response = supabase.auth.sign_up(request.json)
        return jsonify({"error": "None"})
    except Exception as e:
        return jsonify({"error": e.message})
    
@bp.route('/login')
def login():
    try:
        response = supabase.auth.sign_in_with_password(request.json)
        return jsonify({"error": "None"})
    except Exception as e:
        return jsonify({"error": e.message})