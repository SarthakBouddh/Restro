#include <bits/stdc++.h>
using namespace std;

void finalScore(char *str) {
    string s(str);
    int n = s.size();
    vector<pair<char,int>> orig;
    for (int i = 0; i < n; ++i) orig.emplace_back(s[i], i);
    auto sorted = orig;
    sort(sorted.begin(), sorted.end(), [](auto &a, auto &b){
        if (a.first != b.first) return a.first < b.first;
        return a.second < b.second;
    });
    vector<int> moves(n);
    for (int j = 0; j < n; ++j) moves[j] = abs(sorted[j].second - j);
    int S = int(sorted.back().first);
    int F = 0;
    for (int mv : moves) {
        int v = mv + S;
        while (v > 0) {
            F += v % 10;
            v /= 10;
        }
    }
    int f1 = 0, t = F;
    while (t > 0) {
        f1 += t % 10;
        t /= 10;
    }
    char start = char('A' + (f1 - 1) % 26);
    cout << F << "\n" << start;
}

int main() {
    char *str = (char*) malloc(sizeof(char) * 500);
    cin >> str;
    finalScore(str);
    return 0;
}
