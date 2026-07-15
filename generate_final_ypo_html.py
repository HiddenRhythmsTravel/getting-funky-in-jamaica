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
    
    @media only screen and (max-width: 600px) {{
      .container {{ width: 100% !important; max-width: 100% !important; }}
      .card-cell {{ padding: 20px 15px !important; }}
      .intro-cell {{ padding: 25px 15px !important; }}
      .logo-img {{ max-width: 180px !important; }}
      .gif-table {{ max-width: 100% !important; width: 100% !important; }}
      .gif-img {{ width: 100% !important; max-width: 100% !important; height: auto !important; }}
      .btn-td {{ width: 100% !important; max-width: 100% !important; }}
      .btn-a {{ display: block !important; padding: 15px 20px !important; box-sizing: border-box !important; }}
    }}
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #0b4745; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; font-size: 16px; line-height: 1.6; color: #f9eee7;">
  
  <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#0b4745" style="background-color: #0b4745; table-layout: fixed; padding: 30px 10px;">
    <tr>
      <td align="center">
        
        <table class="container" border="0" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; width: 100%;">
          
          <!-- Header Block -->
          <tr>
            <td align="center" style="padding-bottom: 5px;">
              <span style="font-size: 11px; font-weight: bold; color: #ef9c82; letter-spacing: 3px; text-transform: uppercase;">Hidden Rhythms Alumni</span>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom: 5px;">
              <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #f9eee7; letter-spacing: 1px; line-height: 1.2; text-transform: uppercase; text-align: center;">Let's Work Together Again!</h1>
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-bottom: 25px;">
              <p style="margin: 0; font-size: 20px; font-weight: bold; color: #ef9c82; letter-spacing: 2px; text-transform: uppercase; text-align: center;">PLANNING YOUR NEXT FORUM OR CHAPTER RETREAT?</p>
            </td>
          </tr>

          <!-- Intro Card -->
          <tr>
            <td style="padding-bottom: 25px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #113938; border: 1px solid rgba(239, 156, 130, 0.2); border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.25); border-collapse: separate !important;">
                <tr>
                  <td class="intro-cell" style="padding: 30px; font-size: 15px; line-height: 1.6; color: #f9eee7; text-align: left;">
                    <p style="margin: 0 0 20px 0;">{intro_sentence}</p>
                    <p style="margin: 0 0 20px 0;">We are still very much involved with travel to the island and are focused now on doing bi-monthly humanitarian style trips that continue to be impactful for the Cubans on the ground. If ever interested in coming down or supporting those efforts, please contact us.</p>
                    <p style="margin: 0;">As alumni of our Cuba programs, you are part of an exclusive circle that has been able to experience what we best excel at – curated retreats that go beyond the normal traveler's expectations. Many of you have been following but over the past 5 years, we have been taking our model that originated in Cuba to other destinations. For those of you who weren't aware, check us out at <a href="https://hiddenrhythmstravel.com" target="_blank" style="color: #ef9c82; text-decoration: underline; font-weight: bold;">Hidden Rhythms</a>.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Resized Logo -->
          <tr>
            <td align="center" style="padding-bottom: 30px;">
              <img class="logo-img" src="brand-logo-bespoke.png" alt="Hidden Rhythms" width="220" style="max-width: 220px; width: 100%; height: auto; display: block; margin: 0 auto;" />
            </td>
          </tr>

          <!-- Middle Destination Header -->
          <tr>
            <td align="center" style="padding-bottom: 25px;">
              <h2 style="margin: 0; font-size: 16px; font-weight: bold; color: #ef9c82; letter-spacing: 2px; text-transform: uppercase; text-align: center;">THINKING ABOUT YOUR NEXT FORUM OR CHAPTER RETREAT?</h2>
            </td>
          </tr>

          <!-- Destination 1: Colombia -->
          <tr>
            <td style="padding-bottom: 20px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #113938; border: 1px solid rgba(239, 156, 130, 0.2); border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.15); border-collapse: separate !important;">
                <tr>
                  <td class="card-cell" style="padding: 20px; text-align: left;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <h3 style="margin: 0 0 5px 0; font-size: 18px; font-weight: bold; text-transform: uppercase; color: #ef9c82; letter-spacing: 0.5px; line-height: 1.2;">Colombia (Medellin, Cartagena, Bogota & Beyond)</h3>
                          <p style="margin: 0; font-style: italic; color: #f9eee7; font-size: 14px;">The country that created Magical Realism</p>
                        </td>
                      </tr>
                      <tr>
                        <td align="center">
                          <table class="gif-table" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 450px; margin: 0 auto;">
                            <tr>
                              <td align="center">
                                <a href="https://hiddenrhythmstravel.com/colombia-experience" target="_blank" style="display: block; text-decoration: none; border-radius: 8px; overflow: hidden; border: 1px solid rgba(239, 156, 130, 0.15);">
                                  <img class="gif-img" src="colombia_loop.gif" alt="Colombia Montage Reel" width="450" style="display: block; width: 100%; max-width: 450px; border: 0;" />
                                </a>
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

          <!-- Destination 2: Mexico City -->
          <tr>
            <td style="padding-bottom: 20px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #113938; border: 1px solid rgba(239, 156, 130, 0.2); border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.15); border-collapse: separate !important;">
                <tr>
                  <td class="card-cell" style="padding: 20px; text-align: left;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <h3 style="margin: 0 0 5px 0; font-size: 18px; font-weight: bold; text-transform: uppercase; color: #ef9c82; letter-spacing: 0.5px; line-height: 1.2;">Mexico City</h3>
                          <p style="margin: 0; font-style: italic; color: #f9eee7; font-size: 14px;">World Class oaxacan heritage, forward thinking innovators, and a city full of surprises</p>
                        </td>
                      </tr>
                      <tr>
                        <td align="center">
                          <table class="gif-table" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 450px; margin: 0 auto;">
                            <tr>
                              <td align="center">
                                <a href="https://hiddenrhythmstravel.com/mexico-city-experience" target="_blank" style="display: block; text-decoration: none; border-radius: 8px; overflow: hidden; border: 1px solid rgba(239, 156, 130, 0.15);">
                                  <img class="gif-img" src="mexico_loop.gif" alt="Mexico City Reel" width="450" style="display: block; width: 100%; max-width: 450px; border: 0;" />
                                </a>
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

          <!-- Destination 3: Jamaica -->
          <tr>
            <td style="padding-bottom: 20px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #113938; border: 1px solid rgba(239, 156, 130, 0.2); border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.15); border-collapse: separate !important;">
                <tr>
                  <td class="card-cell" style="padding: 20px; text-align: left;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <h3 style="margin: 0 0 5px 0; font-size: 18px; font-weight: bold; text-transform: uppercase; color: #ef9c82; letter-spacing: 0.5px; line-height: 1.2;">Kingston or Negril, Jamaica</h3>
                          <p style="margin: 0; font-style: italic; color: #f9eee7; font-size: 14px;">Reggae roots, Cliff diving, & the Goldeneye resort</p>
                        </td>
                      </tr>
                      <tr>
                        <td align="center">
                          <table class="gif-table" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 450px; margin: 0 auto;">
                            <tr>
                              <td align="center">
                                <a href="https://hiddenrhythmstravel.com/jamaica-experience" target="_blank" style="display: block; text-decoration: none; border-radius: 8px; overflow: hidden; border: 1px solid rgba(239, 156, 130, 0.15);">
                                  <img class="gif-img" src="jamaica_loop.gif" alt="Jamaica Reel" width="450" style="display: block; width: 100%; max-width: 450px; border: 0;" />
                                </a>
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

          <!-- Destination 4: New Orleans -->
          <tr>
            <td style="padding-bottom: 30px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #113938; border: 1px solid rgba(239, 156, 130, 0.2); border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.15); border-collapse: separate !important;">
                <tr>
                  <td class="card-cell" style="padding: 20px; text-align: left;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <h3 style="margin: 0 0 5px 0; font-size: 18px; font-weight: bold; text-transform: uppercase; color: #ef9c82; letter-spacing: 0.5px; line-height: 1.2;">New Orleans</h3>
                          <p style="margin: 0; font-style: italic; color: #f9eee7; font-size: 14px;">An iconic town with soul and depth beyond just Mardi Gras</p>
                        </td>
                      </tr>
                      <tr>
                        <td align="center">
                          <table class="gif-table" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 450px; margin: 0 auto;">
                            <tr>
                              <td align="center">
                                <a href="https://hiddenrhythmstravel.com/new-orleans-experience" target="_blank" style="display: block; text-decoration: none; border-radius: 8px; overflow: hidden; border: 1px solid rgba(239, 156, 130, 0.15);">
                                  <img class="gif-img" src="nola_loop.gif" alt="New Orleans Reel" width="450" style="display: block; width: 100%; max-width: 450px; border: 0;" />
                                </a>
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

          <!-- CTA Section (Bulletproof HTML Button) -->
          <tr>
            <td align="center" style="padding: 10px 0 30px 0;">
              <table border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                <tr>
                  <td class="btn-td" align="center" bgcolor="#ef9c82" style="background-color: #ef9c82; border-radius: 25px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
                    <a class="btn-a" href="mailto:adam@cubaeducationaltravel.com?subject=Retreat%20Planning%20-%20{trip_name_subject}" style="display: block; padding: 15px 35px; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; font-size: 14px; font-weight: bold; color: #0b4745; text-decoration: none; letter-spacing: 1.5px; text-transform: uppercase; border-radius: 25px; -webkit-text-size-adjust: none;">
                      <span style="color: #0b4745; text-decoration: none; font-weight: bold;">Start Planning Your Next Event Now</span>
                    </a>
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
