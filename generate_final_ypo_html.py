import pandas as pd
import os
import re

# Paths
INPUT_FILE = "Campaigns/zoho_contacts_READY_TO_IMPORT.csv"
OUTPUT_HTML_DIR = "zoho-one-pagers/ypo-trips-html"

os.makedirs(OUTPUT_HTML_DIR, exist_ok=True)

# Load data
df = pd.read_csv(INPUT_FILE)

# Filter for YPO contacts
ypo_df = df[df['Antigravity_Marketing_Tag'] == 'YPO'].copy()
ypo_df['Past Trip Group'] = ypo_df['Past Trip Group'].fillna('Unknown')

# Get valid trips (all 73 unique groups including Unknown)
trip_counts = ypo_df['Past Trip Group'].value_counts()
valid_trips = []
for trip, count in trip_counts.items():
    valid_trips.append((trip, count))

# Reconnect template
# HTML Template based on final instructions
html_template = """<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Planning Your Next Forum or Chapter Retreat?</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style type="text/css">
    body, table, td, a {{ -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }}
    table, td {{ mso-table-lspace: 0pt; mso-table-rspace: 0pt; }}
    img {{ -ms-interpolation-mode: bicubic; }}
    img {{ border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }}
    table {{ border-collapse: collapse !important; }}
    body {{ height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #0b4745; }}
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #0b4745; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #f9eee7;">
  
  <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#0b4745" style="background-color: #0b4745; table-layout: fixed;">
    <tr>
      <td align="center" style="padding: 10px 0;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; width: 100%; box-sizing: border-box; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;">
          <tr>
            <td style="padding: 20px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
            
            <!-- Header Block -->
            <tr>
              <td align="center" style="padding-bottom: 5px;">
                <span style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; font-size: 12px; font-weight: bold; color: #ef9c82; letter-spacing: 3px; text-transform: uppercase;">Hidden Rhythms Alumni</span>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-bottom: 5px;">
                <h1 style="margin: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; font-size: 28px; font-weight: bold; color: #f9eee7; letter-spacing: 1px; line-height: 1.2; text-transform: uppercase; text-align: center;">Let's Work Together Again!</h1>
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-bottom: 30px;">
                <p style="margin: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; font-size: 22px; font-weight: bold; color: #ef9c82; letter-spacing: 2px; text-transform: uppercase; text-align: center;">PLANNING YOUR NEXT FORUM OR CHAPTER RETREAT?</p>
              </td>
            </tr>

      <!-- Intro Card -->
      <tr>
        <td style="background-color: #113938; border: 1px solid rgba(239, 156, 130, 0.2); border-radius: 12px; padding: 30px; box-shadow: 0 10px 25px rgba(0,0,0,0.25);">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding-bottom: 20px; font-size: 16px; line-height: 1.6; color: #f9eee7; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; text-align: left;">
                {intro_sentence}
              </td>
            </tr>
            <tr>
              <td style="padding-bottom: 20px; font-size: 16px; line-height: 1.6; color: #f9eee7; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; text-align: left;">
                We are still very much involved with travel to the island and are focused now on doing bi-monthly humanitarian style trips that continue to be impactful for the Cubans on the ground. If ever interested in coming down or supporting those efforts, please contact us.
              </td>
            </tr>
            <tr>
              <td style="font-size: 16px; line-height: 1.6; color: #f9eee7; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; text-align: left;">
                As alumni of our Cuba programs, you are part of an exclusive circle that has been able to experience what we best excel at – curated retreats that go beyond the normal traveler's expectations. Many of you have been following but over the past 5 years, we have been taking our model that originated in Cuba to other destinations. For those of you who weren't aware, check us out at <a href="https://hiddenrhythmstravel.com" target="_blank" style="color: #ef9c82; text-decoration: underline; font-weight: bold;">Hidden Rhythms</a>.
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Large Bold Subheader -->
      <tr>
        <td align="center" style="padding-bottom: 25px;">
          <h1 style="margin: 25px 0 0 0; font-size: 24px; font-weight: bold; color: #ef9c82; text-transform: uppercase; text-align: center;">PLANNING YOUR NEXT FORUM OR CHAPTER RETREAT?</h1>
        </td>
      </tr>

      <!-- Centered Resized Logo -->
      <tr>
        <td align="center">
          <img src="hidden_rhythms_email_logo.jpg" alt="Hidden Rhythms" style="max-width: 250px; width: 100%; height: auto; display: block; margin: 25px auto;" />
        </td>
      </tr>

      <!-- Middle Destination Header -->
      <tr>
        <td align="center" style="padding-bottom: 25px;">
          <h2 style="margin: 0; font-size: 18px; font-weight: bold; color: #ef9c82; letter-spacing: 1px; text-transform: uppercase; text-align: center;">THINKING ABOUT YOUR NEXT FORUM OR CHAPTER RETREAT?</h2>
        </td>
      </tr>

      <!-- Destination 1: Colombia -->
      <tr>
        <td style="background-color: #113938; border: 1px solid rgba(239, 156, 130, 0.2); border-radius: 12px; padding: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.15); display: block; margin-bottom: 20px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding-bottom: 10px;">
                <h3 style="margin: 0 0 5px 0; font-size: 22px; font-weight: bold; text-transform: uppercase; color: #ef9c82; letter-spacing: 0.5px; line-height: 1.2;">Colombia (Medellin, Cartagena, Bogota & Beyond)</h3>
                <p style="margin: 0; font-style: italic; color: #f9eee7; font-size: 15px;">The country that created Magical Realism</p>
              </td>
            </tr>
            <tr>
              <td align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 450px; margin: 0 auto;">
                  <tr>
                    <td align="center">
                      <a href="https://hiddenrhythmstravel.com/colombia-experience" target="_blank" style="display: block; text-decoration: none; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0;">
                        <img src="colombia_loop.gif" alt="Colombia Montage Reel" width="450" style="display: block; width: 100%; max-width: 450px;" />
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Destination 2: Mexico City -->
      <tr>
        <td style="background-color: #113938; border: 1px solid rgba(239, 156, 130, 0.2); border-radius: 12px; padding: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.15); display: block; margin-bottom: 20px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding-bottom: 10px;">
                <h3 style="margin: 0 0 5px 0; font-size: 22px; font-weight: bold; text-transform: uppercase; color: #ef9c82; letter-spacing: 0.5px; line-height: 1.2;">Mexico City</h3>
                <p style="margin: 0; font-style: italic; color: #f9eee7; font-size: 15px;">World Class oaxacan heritage, forward thinking innovators, and a city full of surprises</p>
              </td>
            </tr>
            <tr>
              <td align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 450px; margin: 0 auto;">
                  <tr>
                    <td align="center">
                      <a href="https://hiddenrhythmstravel.com/mexico-city-experience" target="_blank" style="display: block; text-decoration: none; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0;">
                        <img src="mexico_loop.gif" alt="Mexico City Reel" width="450" style="display: block; width: 100%; max-width: 450px;" />
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Destination 3: Jamaica -->
      <tr>
        <td style="background-color: #113938; border: 1px solid rgba(239, 156, 130, 0.2); border-radius: 12px; padding: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.15); display: block; margin-bottom: 20px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding-bottom: 10px;">
                <h3 style="margin: 0 0 5px 0; font-size: 22px; font-weight: bold; text-transform: uppercase; color: #ef9c82; letter-spacing: 0.5px; line-height: 1.2;">Kingston or Negril, Jamaica</h3>
                <p style="margin: 0; font-style: italic; color: #f9eee7; font-size: 15px;">Reggae roots, Cliff diving, & the Goldeneye resort</p>
              </td>
            </tr>
            <tr>
              <td align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 450px; margin: 0 auto;">
                  <tr>
                    <td align="center">
                      <a href="https://hiddenrhythmstravel.com/jamaica-experience" target="_blank" style="display: block; text-decoration: none; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0;">
                        <img src="jamaica_loop.gif" alt="Jamaica Reel" width="450" style="display: block; width: 100%; max-width: 450px;" />
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Destination 4: New Orleans -->
      <tr>
        <td style="background-color: #113938; border: 1px solid rgba(239, 156, 130, 0.2); border-radius: 12px; padding: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.15); display: block; margin-bottom: 20px;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="padding-bottom: 10px;">
                <h3 style="margin: 0 0 5px 0; font-size: 22px; font-weight: bold; text-transform: uppercase; color: #ef9c82; letter-spacing: 0.5px; line-height: 1.2;">New Orleans</h3>
                <p style="margin: 0; font-style: italic; color: #f9eee7; font-size: 15px;">An iconic town with soul and depth beyond just Mardi Gras</p>
              </td>
            </tr>
            <tr>
              <td align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 450px; margin: 0 auto;">
                  <tr>
                    <td align="center">
                      <a href="https://hiddenrhythmstravel.com/new-orleans-experience" target="_blank" style="display: block; text-decoration: none; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0;">
                        <img src="nola_loop.gif" alt="New Orleans Reel" width="450" style="display: block; width: 100%; max-width: 450px;" />
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- CTA Section -->
      <tr>
        <td align="center" style="padding-top: 20px; padding-bottom: 20px;">
          <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
            <tr>
              <td align="center">
                <a href="mailto:adam@cubaeducationaltravel.com?subject=Retreat%20Planning%20-%20{trip_name_subject}" style="background-color: #ef9c82; color: #0b4745; font-size: 16px; font-weight: bold; text-decoration: none; padding: 16px 32px; display: inline-block; border-radius: 5px; letter-spacing: 1px; text-transform: uppercase; margin: 30px auto; text-align: center;">Start Planning Your Next Trip Now</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>

              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

</body>
</html>
"""

print(f"Generating {len(valid_trips)} YPO trip HTML templates based on docx...")

for trip, count in valid_trips:
    # Extract date
    match_date = re.search(r'(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{4}|\d{4}', trip)
    date_str = match_date.group(0) if match_date else 'our past journey'
    
    # Format group name (clean trip name without date)
    group_name = trip
    if match_date:
        group_name = trip.replace(match_date.group(0), '').replace(' - ', ' ').strip(' - ')
        
    clean_name = re.sub(r'[^a-zA-Z0-9_\-]', '_', trip).strip('_')

    # Intro sentence logic with exact copy, inline typography, and trip date styling
    if trip == 'Unknown':
        intro_sentence = "It was a pleasure for us (Collin, Adam, Michael, and the rest of the Cuba Educational Travel family) to plan your past Cuba retreat. As business leaders, we think its important to remember highlights and fun memories that trips like yours have given us."
    else:
        intro_sentence = f"It was a pleasure for us (Collin, Adam, Michael, and the rest of the Cuba Educational Travel family) to plan your Cuba retreat back in <span style=\"font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; font-size: 16px; line-height: 1.6; font-weight: bold; color: #ef9c82;\">{date_str}</span>. As business leaders, we think its important to remember highlights and fun memories that trips like yours have given us."
    
    # Fill template
    filled_html = html_template.format(
        intro_sentence=intro_sentence,
        trip_name_subject=group_name
    )
    
    # Save
    file_path = os.path.join(OUTPUT_HTML_DIR, f"one_pager_{clean_name}.html")
    with open(file_path, "w") as f:
        f.write(filled_html)

print("HTML generation complete!")
