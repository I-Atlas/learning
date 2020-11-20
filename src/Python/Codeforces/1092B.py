def teams_forming(n, skills):
    skills.sort()
    total_skills_needed = 0
    for i in range(0, n, 2):
        total_skills_needed += (skills[i+1] - skills[i])
    return total_skills_needed


if __name__ == "__main__":
    n = int(input())
    skills = list(map(int, input().split(" ")))
    print(teams_forming(n, skills))