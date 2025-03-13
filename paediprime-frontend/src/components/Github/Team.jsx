import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Team.css'; // Include the CSS for additional styling if needed

import SoumyadeepImg from './images/Soumyadeep.jpeg';
import SardarImg from './images/Sardar.jpeg';
import CAImg from './images/CA.jpeg';
import AmitImg from './images/AmitMandhana.jpeg';
import AkashImg from './images/Akash.jpeg';
import PrinceImg from './images/Prince.jpeg';
import SubhankarImg from './images/Subhankar.jpeg';
import SubhadeepImg from './images/Subhadeep.jpeg';
import PrithwishImg from './images/Prithwish.jpeg';

const teamMembers = [
  {
    name: 'Soumyadeep Pal',
    role: 'Co - Founder , Chief Executive Officer(CEO)',
    githubUrl: 'https://github.com/Sekekama2005',
    linkedinUrl: 'https://www.linkedin.com/in/soumyadeep-pal-622042292',
    image: SoumyadeepImg // Replace with actual image URL
  },
  {
    name: 'Soumyadip Sardar',
    role: 'Co-Founder , Chief Medical Officer (CMO)',
    githubUrl: '#',
    linkedinUrl: 'https://www.linkedin.com/in/soumyadip-sardar-031b47302?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    image: SardarImg, // Replace with actual image URL
  },
  {
    name: 'Saurabh Kumar(Tibrewal)',
    role: 'Co- Founder , Chief Financial Officer(CFO) , CA , Chief marketing Officer (CMO)',
    githubUrl: '#',
    linkedinUrl: 'https://www.linkedin.com/in/ca-saurabh-kumar-tibrewal-026642206?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    image: CAImg, // Replace with actual image URL
  },
  {
    name: 'Amit Mandhana ',
    role: 'Chief Technical Officer ( CTO ) (Website Developer,AI/ML)',
    githubUrl: 'https://github.com/AmitMandhana',
    linkedinUrl: 'http://www.linkedin.com/in/amit-mandhana',
    image: AmitImg // Replace with actual image URL
  },
  {
    name: 'Akash Mondal',
    role: 'Frontend Developer',
    githubUrl: 'https://github.com/Akash-Mondal2004',
    linkedinUrl: 'https://www.linkedin.com/in/akash-mondal-518641267?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    image: AkashImg, // Replace with actual image URL
  },
  {
    name: 'Prince Singh',
    role: 'Website Developer (Backend)',
    githubUrl: 'https://github.com/Userride',
    linkedinUrl: 'https://www.linkedin.com/in/prince-singh-891a1b279?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    image: PrinceImg // Replace with actual image URL
  },
  {
    name: 'Subhankar Kumar',
    role: 'Website Developer(Frontend)',
    githubUrl: 'https://github.com/Shubhankarkmr',
    linkedinUrl: '#',
    image: SubhankarImg, // Replace with actual image URL
  },
  {
    name: 'Subhadeep Mondal',
    role: 'Website Developer (Backend) ',
    githubUrl: 'https://github.com/im-subhadeep',
    linkedinUrl: 'https://www.linkedin.com/in/subhadeep-mondal-8090b222b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    image: SubhadeepImg, // Replace with actual image URL
  },
  {
    name: 'Prithwish Dey',
    role: 'AI/ML Developer',
    githubUrl: 'https://github.com/prithwish2dey',
    linkedinUrl: 'www.linkedin.com/in/prithwish-dey-9a6267286',
    image: PrithwishImg, // Replace with actual image URL
  },
  // Add more team members as needed
];

const TeamMember = ({ name, role, githubUrl, linkedinUrl, image }) => (
  <div className="team-member">
    <img src={image} alt={`${name}'s profile`} className="team-member-image" />
    <h3 className="team-member-name font-bold">{name}</h3>
    <p className="team-member-role">{role}</p>
    <div className="team-member-links">
      <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="team-member-link">
        <FaGithub size={30} />
      </a>
      <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="team-member-link">
        <FaLinkedin size={30} />
      </a>
    </div>
  </div>
);

const TeamM = () => (
  <div className="team">
    <h1 className="text-6xl font-bold text-orange-500 p-6">Meet Our Team!!</h1>
    <div className="team-members">
      {teamMembers.map((member, index) => (
        <TeamMember key={index} {...member} />
      ))}
    </div>
  </div>
);

const Team = () => (
  <div className="Team">
    <TeamM />
  </div>
);

export default Team;
