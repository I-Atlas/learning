from email.message import EmailMessage
import smtplib

# For authentication, enter your full Gmail address (you@yourdomain.com) and password. Make sure to sign in to the account before you use it with the device or app.

EMAIL = 'youemail@gmail.com'  # paste there your e-mail
PASSWORD = 'yourpass'   # paste there your google password

letter = EmailMessage()

letter['Subject'] = 'your subject'
letter['From'] = EMAIL
letter['To'] = ['example@gmail.com']  # paste there your e-mail

writing = 'your messsage'  # this place for your messsage
letter.set_content(writing)

attachment = ['the path to the file']  # paste there the path to the file, example: 'C:\\User\\index\\index.html'

for path in attachment:
    with open(path, 'rb') as file:
        data = file.read()
        name = path.split('\\')[-1]

    letter.add_attachment(data, maintype='application', subtype='octet-stream', filename=name)

with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
    smtp.login(EMAIL, PASSWORD)
    smtp.send_message(letter)
