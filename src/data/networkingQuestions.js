export const NETWORKING_EXPECTED_COUNT = 70;

function createQuestion(id, unit, question, options, answer, solution = '') {
  return {
    id,
    unit,
    question,
    options: ['A', 'B', 'C', 'D'].map((label, index) => ({
      label,
      text: options[index],
    })),
    answer,
    solution: solution || `Correct answer is option (${answer}).`,
  };
}

export const networkingQuestions = [
  // Unit I: Basic Concepts
  createQuestion(1, 'Unit I: Basic Concepts', 'What are the components of data communication?', ['Message, Sender, Receiver, Medium, Protocol', 'Data, Signal, Channel', 'Transmitter, Receiver', 'Source, Destination'], 'A'),
  createQuestion(2, 'Unit I: Basic Concepts', 'Which organization develops networking standards?', ['ISO', 'IEEE', 'IETF', 'All of the above'], 'D'),
  createQuestion(3, 'Unit I: Basic Concepts', 'What is a network topology?', ['Physical layout of network', 'Logical layout', 'Both A and B', 'Neither'], 'C'),
  createQuestion(4, 'Unit I: Basic Concepts', 'Which topology connects all nodes in a circle?', ['Ring', 'Star', 'Bus', 'Mesh'], 'A'),
  createQuestion(5, 'Unit I: Basic Concepts', 'Which topology has a central hub?', ['Star', 'Ring', 'Bus', 'Mesh'], 'A'),
  createQuestion(6, 'Unit I: Basic Concepts', 'Which topology has a single cable?', ['Bus', 'Star', 'Ring', 'Mesh'], 'A'),
  createQuestion(7, 'Unit I: Basic Concepts', 'What is a protocol?', ['Set of rules for communication', 'Hardware device', 'Software application', 'Network cable'], 'A'),
  createQuestion(8, 'Unit I: Basic Concepts', 'How many layers are in OSI model?', ['5', '7', '4', '6'], 'B'),
  createQuestion(9, 'Unit I: Basic Concepts', 'Which layer is the lowest in OSI model?', ['Physical', 'Data Link', 'Network', 'Transport'], 'A'),
  createQuestion(10, 'Unit I: Basic Concepts', 'Which layer is the highest in OSI model?', ['Application', 'Presentation', 'Session', 'Transport'], 'A'),
  createQuestion(11, 'Unit I: Basic Concepts', 'How many layers are in TCP/IP model?', ['4', '5', '7', '3'], 'A'),
  createQuestion(12, 'Unit I: Basic Concepts', 'Which layer provides end-to-end communication?', ['Transport', 'Network', 'Data Link', 'Physical'], 'A'),
  createQuestion(13, 'Unit I: Basic Concepts', 'Which protocol is connection-oriented?', ['TCP', 'UDP', 'IP', 'HTTP'], 'A'),
  createQuestion(14, 'Unit I: Basic Concepts', 'Which protocol is connectionless?', ['UDP', 'TCP', 'HTTP', 'FTP'], 'A'),
  createQuestion(15, 'Unit I: Basic Concepts', 'What is the function of a router?', ['Connect different networks', 'Connect devices in same network', 'Amplify signals', 'Convert signals'], 'A'),

  // Unit II: Physical Layer
  createQuestion(16, 'Unit II: Physical Layer', 'What is the function of the physical layer?', ['Transmission of raw bits', 'Routing', 'Error correction', 'Flow control'], 'A'),
  createQuestion(17, 'Unit II: Physical Layer', 'Which is a guided transmission medium?', ['Twisted pair cable', 'Radio waves', 'Microwaves', 'Infrared'], 'A'),
  createQuestion(18, 'Unit II: Physical Layer', 'Which cable has the highest bandwidth?', ['Optical fiber', 'Coaxial cable', 'Twisted pair', 'Wireless'], 'A'),
  createQuestion(19, 'Unit II: Physical Layer', 'What is a transmission impairment?', ['Signal degradation', 'Signal amplification', 'Signal filtering', 'Signal encoding'], 'A'),
  createQuestion(20, 'Unit II: Physical Layer', 'What is attenuation?', ['Loss of signal strength', 'Increase in signal', 'Filtering of signal', 'Encoding of signal'], 'A'),
  createQuestion(21, 'Unit II: Physical Layer', 'What is the function of a hub?', ['Broadcasts data to all ports', 'Filters data', 'Routes data', 'Switches data'], 'A'),
  createQuestion(22, 'Unit II: Physical Layer', 'What is the function of a switch?', ['Filters and forwards data', 'Broadcasts to all ports', 'Routes between networks', 'Amplifies signals'], 'A'),
  createQuestion(23, 'Unit II: Physical Layer', 'What is the function of a bridge?', ['Connects two LANs', 'Connects two networks', 'Routes between networks', 'Amplifies signals'], 'A'),
  createQuestion(24, 'Unit II: Physical Layer', 'Which device operates at the physical layer?', ['Hub', 'Switch', 'Router', 'Bridge'], 'A'),
  createQuestion(25, 'Unit II: Physical Layer', 'Which device operates at the network layer?', ['Router', 'Switch', 'Hub', 'Bridge'], 'A'),

  // Unit III: Data Link Layer
  createQuestion(26, 'Unit III: Data Link Layer', 'What is framing?', ['Dividing bit stream into frames', 'Error detection', 'Flow control', 'Routing'], 'A'),
  createQuestion(27, 'Unit III: Data Link Layer', 'What is error control?', ['Detecting and correcting errors', 'Controlling flow', 'Routing data', 'Framing data'], 'A'),
  createQuestion(28, 'Unit III: Data Link Layer', 'What is flow control?', ['Controlling data rate', 'Error detection', 'Routing', 'Framing'], 'A'),
  createQuestion(29, 'Unit III: Data Link Layer', 'What is CSMA/CD?', ['Carrier Sense Multiple Access with Collision Detection', 'Carrier Sense Multiple Access with Collision Avoidance', 'Clear Sense Multiple Access', 'Control Sense Multiple Access'], 'A'),
  createQuestion(30, 'Unit III: Data Link Layer', 'What is CSMA/CA?', ['Carrier Sense Multiple Access with Collision Avoidance', 'Carrier Sense Multiple Access with Collision Detection', 'Clear Sense Multiple Access', 'Control Sense Multiple Access'], 'A'),
  createQuestion(31, 'Unit III: Data Link Layer', 'Which protocol detects collisions?', ['CSMA/CD', 'CSMA/CA', 'Token Ring', 'Ethernet'], 'A'),
  createQuestion(32, 'Unit III: Data Link Layer', 'Which protocol avoids collisions?', ['CSMA/CA', 'CSMA/CD', 'Token Ring', 'Ethernet'], 'A'),
  createQuestion(33, 'Unit III: Data Link Layer', 'What is the purpose of MAC address?', ['Identify devices on a network', 'Identify networks', 'Identify applications', 'Identify users'], 'A'),
  createQuestion(34, 'Unit III: Data Link Layer', 'How many bits are in a MAC address?', ['48 bits', '32 bits', '64 bits', '128 bits'], 'A'),
  createQuestion(35, 'Unit III: Data Link Layer', 'Which layer uses MAC addresses?', ['Data Link layer', 'Network layer', 'Transport layer', 'Application layer'], 'A'),

  // Unit IV: Network Layer
  createQuestion(36, 'Unit IV: Network Layer', 'What is the function of the network layer?', ['Routing and addressing', 'Error detection', 'Flow control', 'Data transmission'], 'A'),
  createQuestion(37, 'Unit IV: Network Layer', 'What is a virtual circuit?', ['Connection-oriented network service', 'Connectionless service', 'Circuit switching', 'Packet switching'], 'A'),
  createQuestion(38, 'Unit IV: Network Layer', 'What is a datagram?', ['Connectionless network service', 'Connection-oriented service', 'Circuit switching', 'Virtual circuit'], 'A'),
  createQuestion(39, 'Unit IV: Network Layer', 'What is IP addressing?', ['Assigning addresses to devices', 'Routing packets', 'Error detection', 'Flow control'], 'A'),
  createQuestion(40, 'Unit IV: Network Layer', 'How many bits are in IPv4 address?', ['32 bits', '64 bits', '128 bits', '48 bits'], 'A'),
  createQuestion(41, 'Unit IV: Network Layer', 'How many bits are in IPv6 address?', ['128 bits', '32 bits', '64 bits', '48 bits'], 'A'),
  createQuestion(42, 'Unit IV: Network Layer', 'What is subnetting?', ['Dividing a network into subnets', 'Combining networks', 'Assigning IP addresses', 'Routing packets'], 'A'),
  createQuestion(43, 'Unit IV: Network Layer', 'What is a routing algorithm?', ['Determines path for data', 'Assigns IP addresses', 'Detects errors', 'Controls flow'], 'A'),
  createQuestion(44, 'Unit IV: Network Layer', 'Which is an adaptive routing algorithm?', ['Distance-vector routing', 'Static routing', 'Fixed routing', 'Default routing'], 'A'),
  createQuestion(45, 'Unit IV: Network Layer', 'Which is a non-adaptive routing algorithm?', ['Static routing', 'Dynamic routing', 'Distance-vector routing', 'Link-state routing'], 'A'),
  createQuestion(46, 'Unit IV: Network Layer', 'What is the purpose of an IP address?', ['Identify a device on a network', 'Identify an application', 'Identify a user', 'Identify a port'], 'A'),
  createQuestion(47, 'Unit IV: Network Layer', 'Which class of IP address is Class A?', ['0.0.0.0 to 127.255.255.255', '128.0.0.0 to 191.255.255.255', '192.0.0.0 to 223.255.255.255', '224.0.0.0 to 239.255.255.255'], 'A'),
  createQuestion(48, 'Unit IV: Network Layer', 'Which class of IP address is Class B?', ['128.0.0.0 to 191.255.255.255', '0.0.0.0 to 127.255.255.255', '192.0.0.0 to 223.255.255.255', '224.0.0.0 to 239.255.255.255'], 'A'),
  createQuestion(49, 'Unit IV: Network Layer', 'Which class of IP address is Class C?', ['192.0.0.0 to 223.255.255.255', '128.0.0.0 to 191.255.255.255', '0.0.0.0 to 127.255.255.255', '224.0.0.0 to 239.255.255.255'], 'A'),

  // Unit V: Transport Layer
  createQuestion(50, 'Unit V: Transport Layer', 'What is the function of the transport layer?', ['End-to-end communication', 'Routing', 'Addressing', 'Physical transmission'], 'A'),
  createQuestion(51, 'Unit V: Transport Layer', 'Which protocol is used for reliable data transfer?', ['TCP', 'UDP', 'IP', 'HTTP'], 'A'),
  createQuestion(52, 'Unit V: Transport Layer', 'Which protocol is used for unreliable data transfer?', ['UDP', 'TCP', 'IP', 'FTP'], 'A'),
  createQuestion(53, 'Unit V: Transport Layer', 'What is congestion control?', ['Preventing network overload', 'Error detection', 'Flow control', 'Routing'], 'A'),
  createQuestion(54, 'Unit V: Transport Layer', 'What is Quality of Service (QoS)?', ['Performance guarantee', 'Error detection', 'Routing', 'Addressing'], 'A'),
  createQuestion(55, 'Unit V: Transport Layer', 'What is TCP connection management?', ['Establishing and terminating connections', 'Routing', 'Error detection', 'Flow control'], 'A'),
  createQuestion(56, 'Unit V: Transport Layer', 'Which phase is part of TCP connection?', ['Three-way handshake', 'Two-way handshake', 'Four-way handshake', 'No handshake'], 'A'),
  createQuestion(57, 'Unit V: Transport Layer', 'What is the purpose of a port number?', ['Identify an application', 'Identify a device', 'Identify a network', 'Identify a user'], 'A'),
  createQuestion(58, 'Unit V: Transport Layer', 'Which port is used for HTTP?', ['Port 80', 'Port 21', 'Port 25', 'Port 443'], 'A'),
  createQuestion(59, 'Unit V: Transport Layer', 'Which port is used for HTTPS?', ['Port 443', 'Port 80', 'Port 21', 'Port 25'], 'A'),

  // Unit VI: Application Layer and Network Security
  createQuestion(60, 'Unit VI: Application Layer and Network Security', 'What is DNS?', ['Domain Name System', 'Digital Network System', 'Data Network Service', 'Domain Network Service'], 'A'),
  createQuestion(61, 'Unit VI: Application Layer and Network Security', 'What does HTTP stand for?', ['Hypertext Transfer Protocol', 'Hypertext Transmission Protocol', 'High Tech Transfer Protocol', 'Hyper Transfer Protocol'], 'A'),
  createQuestion(62, 'Unit VI: Application Layer and Network Security', 'What is FTP?', ['File Transfer Protocol', 'Fast Transfer Protocol', 'File Transmission Protocol', 'Fast Transmission Protocol'], 'A'),
  createQuestion(63, 'Unit VI: Application Layer and Network Security', 'What is SMTP?', ['Simple Mail Transfer Protocol', 'Simple Message Transfer Protocol', 'Secure Mail Transfer Protocol', 'Simple Mail Transmission Protocol'], 'A'),
  createQuestion(64, 'Unit VI: Application Layer and Network Security', 'What is a firewall?', ['Security system for networks', 'Hardware device', 'Software application', 'Network cable'], 'A'),
  createQuestion(65, 'Unit VI: Application Layer and Network Security', 'What is VPN?', ['Virtual Private Network', 'Virtual Public Network', 'Very Private Network', 'Virtual Protocol Network'], 'A'),
  createQuestion(66, 'Unit VI: Application Layer and Network Security', 'What is the World Wide Web (WWW)?', ['Global information system', 'Network protocol', 'Hardware device', 'Operating system'], 'A'),
  createQuestion(67, 'Unit VI: Application Layer and Network Security', 'What is Telnet?', ['Remote login protocol', 'Email protocol', 'File transfer protocol', 'Web protocol'], 'A'),
  createQuestion(68, 'Unit VI: Application Layer and Network Security', 'What is network security?', ['Protecting networks from threats', 'Routing data', 'Error detection', 'Flow control'], 'A'),
  createQuestion(69, 'Unit VI: Application Layer and Network Security', 'Which is a common network security threat?', ['Virus', 'Firewall', 'VPN', 'Router'], 'A'),
  createQuestion(70, 'Unit VI: Application Layer and Network Security', 'What is cryptography?', ['Encrypting data for security', 'Routing data', 'Error detection', 'Flow control'], 'A'),
];
