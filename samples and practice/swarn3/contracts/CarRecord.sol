pragma solidity ^0.4.24;

/**
 * Contract to store the mileage of a vehicle
 */
contract VehicleRecordBook{

    event Creation(
        address indexed from,
        string indexed vin
    );

    event Transfer(
        address indexed from,
        address indexed to,
        string indexed vin
    );

    struct Date {
        uint16 year;
        uint8 month;
        uint8 day;
    }

    struct vehicle {
        string vin;
        address owner;
    }

    struct Policy {
        string policyNumber;
        uint32 premiumPaid;
        Date startDate;
        Date endDate;
        string policyHash;
    }

    struct Claims {
        string policyNumber;
        string claimNumber;
        uint claimAmount;
        Date date;
        string claimHash;
        uint8 status; // 0: submitted , 1: approved , 2: rejected
    }

    struct serviceMetaInfo {
        Date dateTime;
        uint16 amount;
        string invoiceHash;
    }

    mapping (string => vehicle) cars;
    mapping (string => Claims) totalClaims;
    mapping (string => Policy) totalPolicies;
    mapping(string => bool) claimIDs;
    serviceMetaInfo serviceList;



    function addVehicleServiceDetails(uint16 y, uint8 m, uint8 d, uint16  _invoiceAmount, string _invoiceHash) public {
        Date storage serviceDate;
        serviceDate.year = y;
        serviceDate.month = m;
        serviceDate.day = d;
        serviceList = serviceMetaInfo(serviceDate, _invoiceAmount, _invoiceHash);
    }

    function getServiceMetaInfo(uint serviceId) public view returns(uint16, string) {
        return(serviceList.amount, serviceList.invoiceHash);
    }

    function getServicedate(uint serviceId) public view returns (uint16, uint8, uint8) {
        return (serviceList.dateTime.year,serviceList.dateTime.month, serviceList.dateTime.day);
    }


    function addClaim(string _policyNumber, string _claimNumber, uint _amount, uint16 y, uint8 m, uint8 d, string hash, uint8 _status ) public {
      require(claimIDs[_claimNumber] == false);
    //   require(totalClaims[_policyNumber] != 0);
      claimIDs[_claimNumber] = true;
      totalClaims[_claimNumber].policyNumber = _policyNumber;
      totalClaims[_claimNumber].claimNumber = _claimNumber;
      totalClaims[_claimNumber].claimAmount = _amount;
      totalClaims[_claimNumber].claimHash = hash;
      totalClaims[_claimNumber].status = _status;
      totalClaims[_claimNumber].date = Date(y, m, d);
    }

    function getClaim( string _claimNo) public view returns (string _policyNumber, string _claimNumber, uint _amount, uint16 year, uint8 month, uint8 day, string hash, uint8 _status ) {
      _policyNumber = totalClaims[_claimNo].policyNumber;
      _claimNumber = totalClaims[_claimNo].claimNumber;
      _amount = totalClaims[_claimNo].claimAmount;
      year = totalClaims[_claimNo].date.year;
      month = totalClaims[_claimNo].date.month;
      day = totalClaims[_claimNo].date.day;
      hash = totalClaims[_claimNo].claimHash;
      _status = totalClaims[_claimNo].status;
    }

    function addPolicy(string _policyNumber, uint32 _premiumAmount, uint16 starty, uint8 startm, uint8 startd, uint16 endy, uint8 endm, uint8 endd, string hash ) public {
    //   require(totalPolicies[_policyNumber] == "");
      totalPolicies[_policyNumber].policyNumber = _policyNumber;
      totalPolicies[_policyNumber].premiumPaid = _premiumAmount;
      totalPolicies[_policyNumber].startDate = Date(starty, startm, startd);
      totalPolicies[_policyNumber].endDate = Date(endy, endm, endd);
      totalPolicies[_policyNumber].policyHash = hash;
    }

    constructor() public {}

    /**
     * Creates a track record of a new car.
     * Transaction will fail (and burn gas!) if the car already exists.
     */
    function createVehicle(string vin) public returns(bool){
        assert(cars[vin].owner == 0x0);
        cars[vin].vin = vin;
        cars[vin].owner = msg.sender;

        emit Creation(msg.sender, vin);
        return true;
    }

    /**
    * Updates the current kilometers of the car. Transactions fails and burns gas if
    * the new kilometer value is lower than the old one.
    */
    function updateKilometers(string vin, uint kilometers) public {


    }

    /**
     * Transfers the ownership of a car to a different address.
     * Transaction fails and burns gas if the car is not owned by the caller or if the kilometers are
     * less than the last known state.
     */
    function transferOwnership(string vin, address owner, uint kilometers) public {

    }

    /**
     * Returns the current data of the given car
     */
    function getCar(string vin) public constant returns( address owner) {
    return( cars[vin].owner);
    }
}
