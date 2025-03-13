import React from 'react';
import './ImmunisationSchedule.css'

function ImmunisationSchedule() {
    return (
        <div>
            <h1>National Immunisation Schedule</h1>
            <h2>For Pregnant Women</h2>
            <table>
                <thead>
                    <tr>
                        <th>Vaccine</th>
                        <th>When to give</th>
                        <th>Dose</th>
                        <th>Route</th>
                        <th>Site</th>
                        <th>Immunisation Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>TT-1</td>
                        <td>Early in pregnancy</td>
                        <td>0.5 ml</td>
                        <td>Intra-muscular</td>
                        <td>Upper Arm</td>
                        <td>Complete</td>
                    </tr>
                    <tr>
                        <td>TT-2</td>
                        <td>4 weeks after TT-1*</td>
                        <td>0.5 ml</td>
                        <td>Intra-muscular</td>
                        <td>Upper Arm</td>
                        <td>
                            Complete
                        </td>
                    </tr>
                    <tr>
                        <td>TT-Booster</td>
                        <td>If received 2 TT doses in a pregnancy within the last 3 yrs*</td>
                        <td>0.5 ml</td>
                        <td>Intra-muscular</td>
                        <td>Upper Arm</td>
                        <td>
                            Complete
                        </td>
                    </tr>
                </tbody>
            </table>

            <h2>For Infants</h2>
            <table>
                <thead>
                <tr>
                <th>Vaccine</th>
                <th>When to give</th>
                <th>Dose</th>
                <th>Route</th>
                <th>Site</th>
                <th>Immunisation Status</th>
                </tr>
                </thead>
            <tbody>
            <tr>
                <td>BCG</td>
                <td>At birth or as early as possible till one year of age</td>
                <td>0.1ml (0.05ml until 1 month age)</td>
                <td>Intra-dermal</td>
                <td>Left Upper Arm</td>
                <td>
                    Complete
                    
                </td>
            </tr>
            <tr>
                <td>Hepatitis B - Birth dose</td>
                <td>At birth or as early as possible within 24 hours</td>
                <td>0.5 ml</td>
                <td>Intra-muscular</td>
                <td>Antero-lateral side of mid-thigh</td>
                <td>
                    Complete
                    
                </td>
            </tr>
            <tr>
                <td>OPV-0</td>
                <td>At birth or as early as possible within the first 15 days</td>
                <td>2 drops</td>
                <td>Oral</td>
                <td>Oral</td>
                <td>
                    Complete
                    
                </td>
            </tr>
            <tr>
                <td>OPV 1, 2 & 3</td>
                <td>At 6 weeks, 10 weeks & 14 weeks (OPV can be given till 5 years of age)</td>
                <td>2 drops</td>
                <td>Oral</td>
                <td>Oral</td>
                <td>
                    Complete
                    
                </td>
            </tr>
            <tr>
                <td>Pentavalent 1, 2 & 3</td>
                <td>At 6 weeks, 10 weeks & 14 weeks (can be given till one year of age)</td>
                <td>0.5 ml</td>
                <td>Intra-muscular</td>
                <td>Antero-lateral side of mid-thigh</td>
                <td>
                    Complete
                    
                </td>
            </tr>
            <tr>
                <td>Rotavirus</td>
                <td>At 6 weeks, 10 weeks & 14 weeks (can be given till one year of age)</td>
                <td>5 drops</td>
                <td>Oral</td>
                <td>Oral</td>
                <td>
                    Complete
                    
                   
                </td>
            </tr>
            <tr>
                <td>IPV</td>
                <td>Two fractional dose at 6 and 14 weeks of age</td>
                <td>0.1 ml</td>
                <td>Intra dermal two fractional dose</td>
                <td>Intra-dermal: Right upper arm</td>
                <td>
                    Complete
                    
                </td>
            </tr>
            <tr>
                <td>Measles /MR 1st Dose</td>
                <td>9 completed months-12 months. (can be given till 5 years of age)</td>
                <td>0.5 ml</td>
                <td>Sub-cutaneous</td>
                <td>Right upper Arm</td>
                <td>
                    ---
                    
                </td>
            </tr>
            <tr>
                <td>JE - 1</td>
                <td>9 completed months-12 months.</td>
                <td>0.5 ml</td>
                <td>Sub-cutaneous</td>
                <td>Left upper Arm</td>
                <td>
                   ---
                    
                </td>
            </tr>
            <tr>
                <td>Vitamin A (1st dose)</td>
                <td>At 9 completed months with measles-Rubella</td>
                <td>1 ml (1 lakh IU)</td>
                <td>Oral</td>
                <td>Oral</td>
                <td>
                    ---
                </td>
            </tr>
        </tbody>
    </table>

    <h2>For Children</h2>
    <table>
        <thead>
            <tr>
                <th>Vaccine</th>
                <th>When to give</th>
                <th>Dose</th>
                <th>Route</th>
                <th>Site</th>
                <th>Immunisation Status</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>DPT booster-1</td>
                <td>16-24 months</td>
                <td>0.5 ml</td>
                <td>Intra-muscular</td>
                <td>Antero-lateral side of mid-thigh</td>
                <td>
                    ---
                </td>
            </tr>
            <tr>
                <td>Measles/ MR 2nd dose</td>
                <td>16-24 months</td>
                <td>0.5 ml</td>
                <td>Sub-cutaneous</td>
                <td>Right upper Arm</td>
                <td>
                    ---
                </td>
            </tr>
            <tr>
                <td>OPV Booster</td>
                <td>16-24 months</td>
                <td>2 drops</td>
                <td>Oral</td>
                <td>Oral</td>
                <td>
                    ---
                </td>
            </tr>
            <tr>
                <td>JE-2</td>
                <td>16-24 months</td>
                <td>0.5 ml</td>
                <td>Sub-cutaneous</td>
                <td>Left Upper Arm</td>
                <td>
                   ---
                    
                </td>
            </tr>
            <tr>
                <td>Vitamin A (2nd to 9th dose)</td>
                <td>16-18 months. Then one dose every 6 months up to the age of 5 years.</td>
                <td>2 ml (2 lakh IU)</td>
                <td>Oral</td>
                <td>Oral</td>
                <td>
                    ---
                    
                </td>
            </tr>
            <tr>
                <td>DPT Booster-2</td>
                <td>5-6 years</td>
                <td>0.5 ml</td>
                <td>Intra-muscular</td>
                <td>Upper Arm</td>
                <td>
                    ---
                </td>
            </tr>
            <tr>
                <td>TT</td>
                <td>10 years & 16 years</td>
                <td>0.5 ml</td>
                <td>Intra-muscular</td>
                <td>Upper Arm</td>
                <td>
                   ---
                    
                </td>
            </tr>
            
        </tbody>
    </table>

            <div>
                <div>*Give TT-2 or Booster doses before 36 weeks of pregnancy. However, give these even if more than 36 weeks have passed. Give TT to a woman in labour, if she has not previously received TT.</div> <br/>
                <div>**JE Vaccine is introduced in select endemic districts after the campaign.</div><br/>
                <div>*** The 2nd to 9th doses of Vitamin A can be administered to children 1-5 years old during biannual rounds, in collaboration with ICDS.</div><br/>
                <div>#Phased introduction, at present in Andhra Pradesh, Haryana, Himachal Pradesh and Orissa from 2016 & expanded in Madhya Pradesh, Assam, Rajasthan, and Tripura in February 2017 and planned in Tamil Nadu & Uttar Pradesh in 2017.</div><br/>
                <div>$ Phased introduction, at present in five states namely Karnataka, Tamil Nadu, Goa, Lakshadweep and Puducherry. (As of Feb’ 2017)</div><br/>
            </div>
        </div>
    );
}

export default ImmunisationSchedule;
