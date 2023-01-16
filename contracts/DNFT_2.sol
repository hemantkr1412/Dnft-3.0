// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DNFT_2 is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;

    //structs
      struct UserInfo{
          bool isUser;
          uint256 _tokenId;
          uint256 noOfRewards; 
          bool isPremium;
      }   
      
      struct RewardInfo{
          string reward;
          bool isRewardGiven;
          uint256 issueDate;
          uint256 expiryDate;
          bool isRedeemed; 
          address providerAddr;
      }
      struct OrgInfo{
          bool isRegistered;
          uint noOfUsers;
          string tokenSymbol;
      }
    
    //mappings
    mapping(address=>OrgInfo) public addressToOrgInfo;
    mapping(address=>mapping(address=>UserInfo)) public orgToUserInfo;
    mapping(address=>mapping(address=>RewardInfo[])) public orgToUserReward;//for Orgs just simple one-one......for users, it would be looping through mappin
    mapping(address=>address[]) public userToOrgs; //For user page
    mapping(address=>uint) public totalRewards;
    
    //events
    event TxnInfo(address indexed _sender,address indexed _receiver, bool indexed _isRewarded, bool _isRedeemed);
   
    //custom errors
    error InvalidOwner(address _address);
    error InvalidUser(address _address);
    error AlreadyExist(address _address);
    error AlreadyRedeemed(uint _rewardId);
    error Expired(uint _rewardId);
    
    constructor() ERC721("BitToken", "BIT") {}
    

    //functions
    function orgRegister(string memory _symbol) public {
    if(addressToOrgInfo[msg.sender].isRegistered){
        revert AlreadyExist(msg.sender);
    }
    OrgInfo memory newOrg = OrgInfo({
     isRegistered:true,
     noOfUsers:0,
     tokenSymbol:_symbol
    });
    addressToOrgInfo[msg.sender] = newOrg;
    }

    function safeMint(address to, string memory newUri,bool _isRewarded,bool _isPremium,string memory _reward, uint256 _expiryDate) public {
       
        if(addressToOrgInfo[msg.sender].isRegistered != true){
         revert InvalidOwner(msg.sender);
        }
        if(orgToUserInfo[msg.sender][to].isUser){
           revert AlreadyExist(to);
        }
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId,newUri);

        /*########### Customised Code Starts ############*/
        /*### User Registration cum Reward Info ###*/

        uint noOfReward;
        if(_isRewarded){
            noOfReward++;
            require(_expiryDate>block.timestamp,"Invalid date");
            RewardInfo memory newReward = RewardInfo({
                reward:_reward,
                isRewardGiven:true,
                issueDate:block.timestamp,
                expiryDate:_expiryDate,
                isRedeemed:false,
                providerAddr:msg.sender

            });
            totalRewards[to]++;
            orgToUserReward[msg.sender][to].push(newReward);
        }
        else{
            RewardInfo memory _noReward = RewardInfo({
                reward:"N/A",
                isRewardGiven:false,
                issueDate:block.timestamp,
                expiryDate:0,
                isRedeemed:false,
                providerAddr:msg.sender
            });

            orgToUserReward[msg.sender][to].push(_noReward);
        }

        UserInfo memory newUser = UserInfo({
            isUser:true,
            _tokenId:tokenId,
            noOfRewards:noOfReward,
            isPremium:_isPremium
        });
        userToOrgs[to].push(msg.sender);
        orgToUserInfo[msg.sender][to] = newUser;
        addressToOrgInfo[msg.sender].noOfUsers++;
        emit TxnInfo(msg.sender, to, _isRewarded, false);
    }
    
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }   

    function getOrgLen(address _userAddress) public view returns(uint){
    return userToOrgs[_userAddress].length;//give number of organisation user gets reward
    }
    function getRewardlen(address _hotelAddress,address _userAddress) public view returns(uint){
        return orgToUserReward[_hotelAddress][_userAddress].length;//give total number of reward user have from specific org...
    }
    
   function updateNFT(uint _tokenId,address _userAddress,bool _isPremium,bool _isRewarded,string memory _reward,uint _expiryDate) public {
    if(!orgToUserInfo[msg.sender][_userAddress].isUser || ownerOf(_tokenId) != _userAddress){
        revert InvalidUser(_userAddress);
    }   
    UserInfo storage updateUser = orgToUserInfo[msg.sender][_userAddress];
    if(_isPremium == true){
    updateUser.isPremium = true;
    }

    else if(!_isPremium){
        updateUser.isPremium = false;
    }

    if(_isRewarded){
        updateUser.noOfRewards++;
       RewardInfo memory _newReward = RewardInfo({
            reward:_reward,
            isRewardGiven:true,
            issueDate:block.timestamp,
            expiryDate:_expiryDate,
            isRedeemed:false,
            providerAddr:msg.sender
        });
        totalRewards[_userAddress]++;
       orgToUserReward[msg.sender][_userAddress].push(_newReward);
    }
      else if (!_isRewarded){
            RewardInfo memory _noReward = RewardInfo({
                reward:"N/A",
                isRewardGiven:false,
                issueDate:block.timestamp,
                expiryDate:0,
                isRedeemed:false,
                 providerAddr:msg.sender
            });

            orgToUserReward[msg.sender][_userAddress].push(_noReward);
        }
        emit TxnInfo(msg.sender, _userAddress , _isRewarded,false);
} 

    function redeem(address _userAddress,uint _arrId) public onlyOwner{
        if(!addressToOrgInfo[msg.sender].isRegistered){
            revert InvalidOwner(msg.sender);
        }
        if(!orgToUserInfo[msg.sender][_userAddress].isUser){
            revert InvalidUser(_userAddress);
        }
        UserInfo storage userInfo = orgToUserInfo[msg.sender][_userAddress];
         RewardInfo storage existingReward = orgToUserReward[msg.sender][_userAddress][_arrId];
         if(existingReward.isRedeemed){
             revert AlreadyRedeemed(_arrId);
         }
         if(existingReward.expiryDate < block.timestamp){
             revert Expired(_arrId);
         }
        existingReward.isRedeemed = true;
        userInfo.noOfRewards--;
        totalRewards[_userAddress]--;
        
        emit TxnInfo(msg.sender, _userAddress,false,true);

  }  
} 

//hotel symbol input
//view access to hotel
//expiry date for no reward N/A0
