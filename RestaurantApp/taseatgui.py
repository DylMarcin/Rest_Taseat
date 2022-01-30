import tkinter as tk
from tkinter import ttk
import json
from tkinter import *
import os
from PIL import ImageTk, Image
import requests
import ast
from tkinter import messagebox

#Main Screen
master = Tk()
master.title('Restaurant Application')
master.configure(background='white')

    
def login():
    #Vars
    global login_screen
    temp_login_login = StringVar()
    temp_login_password = StringVar()

    #Login screen
    login_screen = Toplevel(master)
    login_screen.title("Zaloguj")

    #Labels
    Label(login_screen, text = "Zaloguj się", font = ('Calibri', 12)).grid(row=0, sticky = N, pady=10)
    Label(login_screen, text = "Login", font = ('Calibri', 12)).grid(row=1, sticky = W)
    Label(login_screen, text = "Hasło", font = ('Calibri', 12)).grid(row=2, sticky = W)
    login_notif = Label(login_screen, font = ('Calibri', 12))
    login_notif.grid(row=4, sticky=N)

    #Entries
    Entry(login_screen, textvariable=temp_login_login).grid(row=1,column=1,padx=5)
    Entry(login_screen, textvariable=temp_login_password, show="*").grid(row=2,column=1,padx=5)

    #Buttons
    Button(login_screen, text = "Zaloguj", font =('Calibri', 12), command = login_session, width=15).grid(row=3,sticky=N, pady = 5, padx=5)

def accept_booking(value):
    
    url = 'http://127.0.0.1:8000/bookings/'+value[0]+'/'
    requests.patch(url, data ={'accepted': True})

    accepted = Toplevel(master)
    accepted.title('Potwierdzenie')

    Label(accepted, text="Przeniesiono zgloszenie do historii", font=('Calibri',14, "bold italic")).grid(row=0,sticky=N,pady=20, padx=10)

    Button(accepted , text='Okej', font=('Calibri', 12),width=8, command= lambda: accepted.destroy()).grid(row=2, sticky=N, pady=5)
    


def request_booking():

    def OnDoubleClick(event):
        item = treeview.selection()
        kev = []
        for i in item:
           value = treeview.item(i, "values")

        #AddClientScreen
        global AddRental_Screen
        AddRental_Screen = Toplevel(master)
        AddRental_Screen.title('Change status')

        #Labels
        Label(AddRental_Screen, text="Wciśnij 'Akceptuj' by akceptować lub 'Odrzuć' by odrzucić", font=('Calibri',15)).grid(row=0,sticky=N,pady=10)
        
        Label(AddRental_Screen, text=" ", font=('Calibri',12)).grid(row=2,sticky=W)

        notif = Label(AddRental_Screen, font=('Calibri', 12))
        notif.grid(row=8, sticky=N, pady = 10)


        variable = StringVar(master)
        variable.set(value[0])

        lists = []

        #Buttons
        
        Button(AddRental_Screen, text='Akceptuj', font=('Calibri', 12),width=20, command= lambda: [accept_booking(value), AddRental_Screen.destroy(), active_booking_view()]).grid(row=4,sticky=N, pady=5)
        Button(AddRental_Screen, text='Odrzuć', font=('Calibri', 12),width=20, command= lambda: AddRental_Screen.destroy()).grid(row=5,sticky=N, pady=5)

    #ActiveRentalsScreen
    Rental_Screen = Toplevel(master)
    Rental_Screen.title('Reservation requests')

    response = requests.get('http://127.0.0.1:8000/requestbookings/')
    parsed = json.loads(response.text)

    style = ttk.Style()
    style.configure("mystyle1.Treeview", background="yellow", foreground="black")

    style.map('mystyle1.Treeview', background=[('selected', 'red')])

    Label(Rental_Screen, text="Przychodzące rezerwacje", font=('Calibri',12)).grid(row=17,sticky=N)
    treeview = ttk.Treeview(Rental_Screen, style='mystyle1.Treeview', show="headings", columns=('date', 'time', 'seats', 'additionals'))
    treeview.heading("#1", text="Data")
    treeview.column("#1", minwidth=0, width=80, stretch=NO)
    treeview.heading("#2", text="Godzina")
    treeview.column("#2", minwidth=0, width=80, stretch=NO)
    treeview.heading("#3", text="Liczba miejsc")
    treeview.column("#3", minwidth=0, width=80, stretch=NO)
    treeview.heading("#4", text="Dodatkowe informacje")
    treeview.column("#4", minwidth=0, width=400, stretch=NO)
    treeview.grid()


    for row in parsed:
        treeview.insert("", "end", values=(row["date"], row["time"], row["seats"], row["additionals"]))
        treeview.bind("<Double-1>", OnDoubleClick)

def active_booking_view():

    def OnDoubleClick(event):
        pass

    #ActiveRentalsScreen
    Rental_Screen = Toplevel(master)
    Rental_Screen.title('Active Reservations')

    response = requests.get('http://127.0.0.1:8000/acceptedbookings/')
    parsed = json.loads(response.text)

    style = ttk.Style()
    style.configure("mystyle2.Treeview", background="#9dcc45", foreground="black")

    style.map('mystyle2.Treeview', background=[('selected', '#9dcc45')])


    Label(Rental_Screen, text="Aktualna lista rezerwacji", font=('Calibri',12)).grid(row=17,sticky=N)
    treeview = ttk.Treeview(Rental_Screen,style='mystyle2.Treeview', show="headings", columns=('date', 'time', 'seats', 'additionals'))
    treeview.heading("#1", text="Data")
    treeview.column("#1", minwidth=0, width=80, stretch=NO)
    treeview.heading("#2", text="Godzina")
    treeview.column("#2", minwidth=0, width=80, stretch=NO)
    treeview.heading("#3", text="Liczba miejsc")
    treeview.column("#3", minwidth=0, width=80, stretch=NO)
    treeview.heading("#4", text="Dodatkowe informacje")
    treeview.column("#4", minwidth=0, width=400, stretch=NO)
 
    treeview.grid()

    for row in parsed:
        treeview.insert("", "end", values=(row["date"], row["time"], row["seats"], row["additionals"]))
        treeview.bind("<Double-1>", OnDoubleClick)

def logout():
    master.destroy()


img = Image.open('logo.png')
img = img.resize((280,150))
img = ImageTk.PhotoImage(img)

Button(master, text = "Zaloguj", font =('Calibri', 12), width=10, command = login).grid(row=0,sticky=E, pady = 0)

def login_session():
    global login_login

    login_screen.destroy()
    Button(master, text='Aktywne rezerwacje', font=('Calibri', 12),width=20, command=active_booking_view).grid(row=2, column=0, sticky=N, pady=5)
    Button(master, text='Przychodzące rezerwacje', font=('Calibri', 12),width=20, command=request_booking).grid(row=3, column=0, sticky=N, pady=5)
    Button(master, text='Wyloguj', font=('Calibri', 12),width=10, command=logout).grid(row=0, column=0, sticky=E, pady=5)


Label(master, image=img).grid(row=1, sticky=N, pady=15, padx=50)
