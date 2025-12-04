//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract SinFloro is Ownable, ReentrancyGuard {
    enum MarketState {
        OPEN,
        CLOSED,
        RESOLVED
    }

    struct Candidate {
        uint256 id;
        uint256 totalBetAmount;
    }

    IERC20 public bettingToken; //IntiToken
    MarketState public currentState;

    Candidate[] public candidates;
    uint256 public winnerCandidateId;
    uint256 public totalPool;

    // mapping candidateId in base of the user address, to get bet amount
    // bets[candidateId][userAddress] = amount
    mapping(uint256 => mapping(address => uint256)) public bets;

    mapping(address => bool) public hasClaimed;

    /* managing events */
    event NewBet(
        address indexed user,
        uint256 indexed candidateId,
        uint256 amount
    );
    event MarketStatusChanged(MarketState newState);
    event WinnerDeclared(uint256 candidateId);
    event PrizeClaimed(address indexed user, uint256 amount);

    constructor(address _tokenAddress) Ownable(msg.sender) {
        bettingToken = IERC20(_tokenAddress);
        currentState = MarketState.OPEN;
    }

    function addCandidate() external onlyOwner {
        require(currentState == MarketState.OPEN, "Closed market");
        uint256 newId = candidates.length;
        candidates.push(Candidate(newId, 0));
    }
    function closeVoting() external onlyOwner {
        currentState = MarketState.CLOSED;
        emit MarketStatusChanged(MarketState.CLOSED);
    }
    function resolveMarket(uint256 _winnerId) external onlyOwner {
        require(currentState == MarketState.CLOSED, "CLose voting first");
        require(_winnerId < candidates.length, "Invalid ID");

        currentState = MarketState.RESOLVED;
        winnerCandidateId = _winnerId;

        emit WinnerDeclared(_winnerId);
    }

    function placeBet(
        uint256 _candidateId,
        uint256 _amount
    ) external nonReentrant {
        require(currentState == MarketState.OPEN, "Closed bets");
        require(_candidateId < candidates.length, "Candidate not found");
        require(_amount > 0, "Amount must be greater than 0");

        bool success = bettingToken.transferFrom(
            msg.sender,
            address(this),
            _amount
        );
        require(success, "Token transfer failed");

        candidates[_candidateId].totalBetAmount += _amount;
        bets[_candidateId][msg.sender] += _amount;
        totalPool += _amount;

        emit NewBet(msg.sender, _candidateId, _amount);
    }
    function claimPrize() external nonReentrant {
        require(currentState == MarketState.RESOLVED, "There is no winner yet");
        require(!hasClaimed[msg.sender], "You already claimed");

        uint256 userBetOnWinner = bets[winnerCandidateId][msg.sender];
        require(
            userBetOnWinner > 0,
            "You didn't bet on the winner or you lost"
        );

        uint256 totalBetOnWinner = candidates[winnerCandidateId].totalBetAmount;
        require(
            totalBetOnWinner > 0,
            "Nobody guessed correctly, thanks for participating"
        );

        uint256 prize = (userBetOnWinner * totalPool) / totalBetOnWinner;
        hasClaimed[msg.sender] = true;

        bool success = bettingToken.transfer(msg.sender, prize);
        require(success, "Payment failed");

        emit PrizeClaimed(msg.sender, prize);
    }

    function getCandidatePool(
        uint256 _candidateId
    ) external view returns (uint256) {
        return candidates[_candidateId].totalBetAmount;
    }
}
